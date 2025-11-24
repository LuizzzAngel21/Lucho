import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DetalleTransporte } from '../../models/detalleTransporte.model';
import { InfoLoteDialogData } from '../../models/seguimientoDialog.model';
import { DistribucionService } from '../../services/distribucion.service';
import { finalize } from 'rxjs';
import { PopupInfoLoteComponent } from '../../overlays/popup-info-lote/popup-info-lote.component';

@Component({
  selector: 'app-vehiculo-lotes-list.component',
  standalone: false, 
  templateUrl: './vehiculo-lotes-list.component.html',
  styleUrl: './vehiculo-lotes-list.component.css',
})
export class VehiculoLotesListComponent {
  idSeguimiento: number = 0;
  detallesTransporte: DetalleTransporte[] | null = null;
  isLoading: boolean = true;
  
  // Mock para detalles del encabezado (Ejemplo de uso de datos de un seguimiento)
  infoSeguimiento: { placa: string, destino: string } = { placa: '[Cargando...]', destino: '[Cargando...]' };

  constructor(
    private distribucionService: DistribucionService,
    private dialog: MatDialog,
    private route: ActivatedRoute // Para obtener el ID de la ruta
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('idSeguimiento');
      if (id) {
        this.idSeguimiento = +id;
        this.cargarDetallesLotes(this.idSeguimiento);
        // Podríamos cargar la info del encabezado aquí también
        this.infoSeguimiento = { placa: 'ABC-123', destino: 'Hospital Central' };
      } else {
        console.error('ID de seguimiento no encontrado.');
        this.isLoading = false;
      }
    });
  }

  /**
   * Carga los lotes asociados a un ID de seguimiento.
   */
  cargarDetallesLotes(id: number): void {
    this.isLoading = true;
    this.distribucionService.getLotesBySeguimientoId(id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.detallesTransporte = data;
        },
        error: (error) => {
          console.error('Error al cargar lotes del seguimiento:', error);
          alert('Error al cargar la lista de lotes.');
        }
      });
  }

  /**
   * Abre el overlay de detalle del lote.
   */
  onVerInfoLote(idLote: number): void {
    const data: InfoLoteDialogData = { idLote };
    this.dialog.open(PopupInfoLoteComponent, {
      width: '500px',
      data: data
    });
  }

}
