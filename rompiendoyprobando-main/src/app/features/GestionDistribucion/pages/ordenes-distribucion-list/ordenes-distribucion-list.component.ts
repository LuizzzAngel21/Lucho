import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdenDistribucion } from '../../models/ordenDistribucion.model';
import { SelectorVehiculoDialogData, SelectorVehiculoDialogResult } from '../../models/vehiculoDialog.model';
import { DistribucionService } from '../../services/distribucion.service';
import { finalize } from 'rxjs';
import { PopupLoteAsignacionVehiculoComponent } from '../../overlays/popup-lote-asignacion-vehiculo/popup-lote-asignacion-vehiculo.component';
import { ConfirmacionDialogData, ConfirmacionDialogResult } from '../../models/confirmacionDialog.model';
import { PopupCancelarOrdenComponent } from '../../overlays/popup-cancelar-orden/popup-cancelar-orden.component';


@Component({
  selector: 'app-ordenes-distribucion-list.component',
  standalone: false, 
  templateUrl: './ordenes-distribucion-list.component.html',
  styleUrl: './ordenes-distribucion-list.component.css',
})
export class OrdenesDistribucionListComponent implements OnInit{
  ordenes: OrdenDistribucion[] | null = null;
  isLoading: boolean = true;
  filtroBusqueda: string = '';

  constructor(
    private distribucionService: DistribucionService,
    private dialog: MatDialog,
    // private router: Router // Si hubiera navegación a una página de detalle
  ) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  /**
   * Carga la lista inicial de órdenes de distribución desde el servicio.
   */
  cargarOrdenes(): void {
    this.isLoading = true;
    this.distribucionService.getOrdenesDistribucion()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.ordenes = data;
        },
        error: (error) => {
          console.error('Error al cargar órdenes de distribución:', error);
        }
      });
  }

  /**
   * Filtra las órdenes basándose en el texto de búsqueda.
   */
  getOrdenesFiltradas(): OrdenDistribucion[] | null {
    if (!this.ordenes) {
      return null;
    }
    if (!this.filtroBusqueda) {
      return this.ordenes;
    }
    const filtro = this.filtroBusqueda.toLowerCase();
    return this.ordenes.filter(o => 
      o.idOrden.toString().includes(filtro) ||
      o.nombreUsuario.toLowerCase().includes(filtro) ||
      o.area.toLowerCase().includes(filtro)
    );
  }

  /**
   * Maneja la acción de la tabla: abre el overlay de asignación de vehículo.
   * @param idOrden El ID de la Orden de Distribución a asignar.
   */
  onDesignarMovilidad(idOrden: number): void {
    const data: SelectorVehiculoDialogData = { idOrden };
    const dialogRef = this.dialog.open(PopupLoteAsignacionVehiculoComponent, {
      width: '900px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result: SelectorVehiculoDialogResult | undefined) => {
      if (result?.success) {
        // Si la asignación fue exitosa, recargamos las órdenes
        // o actualizamos el estado de la orden localmente
        this.actualizarEstadoOrdenLocal(idOrden, 'Programada');
      }
    });
  }
  
  /**
   * Actualiza el estado de la orden en el array local después de una confirmación.
   */
  actualizarEstadoOrdenLocal(idOrden: number, nuevoEstado: OrdenDistribucion['estado']): void {
    if (!this.ordenes) return;
    
    const index = this.ordenes.findIndex(o => o.idOrden === idOrden);
    if (index !== -1) {
        this.ordenes[index] = { ...this.ordenes[index], estado: nuevoEstado };
        // Forzar la detección de cambios
        this.ordenes = [...this.ordenes]; 
    }
  }

  onCancelarOrden(idOrden: number): void {
    const data: ConfirmacionDialogData = {
      titulo: 'Confirmación de Cancelación',
      mensaje: `¿Está seguro de CANCELAR la Orden de Distribución N° ${idOrden}? Esto detendrá el proceso de entrega.`,
      itemNombre: `Orden N° ${idOrden}`
    };

    const dialogRef = this.dialog.open(PopupCancelarOrdenComponent, {
        width: '450px',
        data: data
    });

    dialogRef.afterClosed().subscribe((result: ConfirmacionDialogResult | undefined) => {
        if (result?.confirmado) {
            this.ejecutarCancelacion(idOrden);
        }
    });
  }

  /**
   * Ejecuta la llamada al servicio para cambiar el estado de la orden a 'Cancelada'.
   */
  ejecutarCancelacion(idOrden: number): void {
    this.distribucionService.cancelarOrden(idOrden)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          alert(`Orden N° ${idOrden} cancelada con éxito.`);
          this.actualizarEstadoOrdenLocal(idOrden, 'Cancelada');
        },
        error: (err) => {
          console.error('Error al cancelar orden:', err);
          alert(`Error: No se pudo cancelar la Orden N° ${idOrden}.`);
        }
      });
  }

}
