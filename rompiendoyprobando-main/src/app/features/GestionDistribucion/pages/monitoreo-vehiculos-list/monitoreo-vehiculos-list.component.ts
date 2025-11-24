import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SeguimientoVehiculo } from '../../models/seguimientoVehiculo.model';
import { Vehiculo } from '../../models/vehiculo.model';
import { DistribucionService } from '../../services/distribucion.service';
import { finalize } from 'rxjs';
import { InfoVehiculoDialogData } from '../../models/vehiculoDialog.model';
import { PopupInfoVehiculoComponent } from '../../overlays/popup-info-vehiculo/popup-info-vehiculo.component';
import { PopupConfirmacionEntregaComponent } from '../../overlays/popup-confirmacion-entrega/popup-confirmacion-entrega.component';
import { ConfirmacionDialogData, ConfirmacionDialogResult } from '../../models/confirmacionDialog.model';
import { PopupCrearIncidenciaComponent } from '../../overlays/popup-crear-incidencia/popup-crear-incidencia.component';
import { IncidenciaDialogData, IncidenciaDialogResult } from '../../models/incidenciaDialog.model';
import { forkJoin, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-monitoreo-vehiculos-list.component',
  standalone: false, 
  templateUrl: './monitoreo-vehiculos-list.component.html',
  styleUrl: './monitoreo-vehiculos-list.component.css',
})
export class MonitoreoVehiculosListComponent implements OnInit{
  seguimientos: SeguimientoVehiculo[] | null = null;
  isLoading: boolean = true;
  filtroBusqueda: string = '';

  constructor(
    private distribucionService: DistribucionService,
    private dialog: MatDialog,
    private router: Router // Para navegar al detalle de lotes
  ) {}

  ngOnInit(): void {
    this.cargarSeguimientos();
  }

  /**
   * Carga la lista de seguimientos de vehículos en ruta.
   */
  cargarSeguimientos(): void {
    this.isLoading = true;
    this.distribucionService.getSeguimientoVehiculos()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.seguimientos = data;
        },
        error: (error) => {
          console.error('Error al cargar seguimientos:', error);
        }
      });
  }

  /**
   * Filtra los seguimientos basándose en el texto de búsqueda.
   */
  getSeguimientosFiltrados(): SeguimientoVehiculo[] | null {
    if (!this.seguimientos) {
      return null;
    }
    if (!this.filtroBusqueda) {
      return this.seguimientos;
    }
    const filtro = this.filtroBusqueda.toLowerCase();
    return this.seguimientos.filter(s => 
      s.idSeguimiento.toString().includes(filtro) ||
      s.placaVehiculo.toLowerCase().includes(filtro) ||
      s.proximoDestino.toLowerCase().includes(filtro)
    );
  }

  /**
   * Acción: Navega a la vista de lotes para el seguimiento seleccionado.
   */
  onVerLotes(idSeguimiento: number): void {
    // Navegación a la página de detalle de lotes (vehiculo-lotes-list)
    this.router.navigate(['/GestionDistribucion/vehiculos/lotes', idSeguimiento]);
  }

  /**
   * Acción: Muestra un overlay (o alerta simple) con la información del vehículo.
   */
  onVerInfoVehiculo(idVehiculo: number): void {
    const data: InfoVehiculoDialogData = { idVehiculo };
    this.dialog.open(PopupInfoVehiculoComponent, {
      width: '450px',
      data: data,
    });
  }

  onConfirmarEntrega(idOrden: number): void {
    // 1. Abrir popup de confirmación
    const data: ConfirmacionDialogData = {
      titulo: 'Confirmar Entrega de Orden',
      mensaje: `¿Desea confirmar la entrega final de la Orden N° ${idOrden}? Esta acción no se puede deshacer y finalizará el seguimiento.`,
      itemNombre: `Orden de Distribución #${idOrden}`
    };

    // 🛑 Usando el nuevo PopupConfirmacionEntregaComponent
    const dialogRef = this.dialog.open(PopupConfirmacionEntregaComponent, {
        width: '450px',
        data: data
    });

    // 2. Esperar la confirmación
    dialogRef.afterClosed().subscribe((result: ConfirmacionDialogResult | undefined) => {
        if (result?.confirmado) {
            this.ejecutarConfirmacionEntrega(idOrden);
        }
    });
  }

  /**
   * Ejecuta la llamada al servicio para cambiar el estado de la orden a 'Completada'.
   */
  ejecutarConfirmacionEntrega(idOrden: number): void {
    // Buscar el seguimiento asociado para actualizar el estado visual.
    const seguimiento = this.seguimientos?.find(s => s.idOrden === idOrden);

    if (!seguimiento) return;

    // Llama al servicio para actualizar el estado de la Orden a 'Completada'
    this.distribucionService.confirmarEntrega(idOrden)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          alert(`Entrega de Orden #${idOrden} confirmada con éxito. El seguimiento ha finalizado.`);
          // 🛑 Actualizar el estado del seguimiento localmente (o recargar la lista)
          seguimiento.estadoActual = 'Entregada'; 
          this.seguimientos = this.seguimientos!.filter(s => s.idOrden !== idOrden);
          this.seguimientos = [...this.seguimientos!]; 
        },
        error: (err) => {
          console.error('Error al confirmar entrega:', err);
          alert(`Error: No se pudo confirmar la entrega de la Orden #${idOrden}.`);
        }
      });
  }


  onRegistrarIncidencia(seguimiento: SeguimientoVehiculo): void {
    // Usamos el ID de la orden (seguimiento.idOrden) para buscar sus lotes
    const idOrden = seguimiento.idOrden;
    
    // 1. Mostrar estado de carga mientras se obtienen los lotes
    this.isLoading = true;

    // 2. Llamar al servicio para obtener los detalles de transporte (lotes) de esta orden/seguimiento
    this.distribucionService.getLotesBySeguimientoId(seguimiento.idSeguimiento)
        .pipe(
            finalize(() => this.isLoading = false)
        )
        .subscribe({
            next: (detallesLotes) => {
                // 3. Transformar la lista de objetos a un simple array de IDs (number[])
                const lotesIds = detallesLotes.map(d => d.idLote);
                
                // 4. Construir la data para el diálogo
                const data: IncidenciaDialogData = {
                    idVehiculo: seguimiento.idVehiculo,
                    idOrdenDist: idOrden,
                    idUsuarioReporta: 1, // Mock ID
                    idDetalleDist: null, 
                    lotesDisponibles: lotesIds // 🛑 ¡ARRAY DE LOTES CARGADO!
                };

                // 5. Abrir el diálogo
                const dialogRef = this.dialog.open(PopupCrearIncidenciaComponent, {
                    width: '600px',
                    height: '800px',
                    data: data
                });

                // 6. Manejar el resultado
                dialogRef.afterClosed().subscribe((result: IncidenciaDialogResult | undefined) => {
                    if (result?.success) {
                        alert('Incidencia registrada con éxito para la Orden ' + idOrden);
                    }
                });
            },
            error: (error) => {
                console.error('Error al cargar lotes para incidencia:', error);
                alert('No se pudo cargar la lista de lotes disponibles para el reporte de incidencia.');
            }
        });
  }
}
