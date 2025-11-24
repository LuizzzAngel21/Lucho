import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { finalize } from 'rxjs';

import { DetalleOrdenDistribucion } from '../../models/detalleOrdenDistribucion.model';
import { SelectorVehiculoDialogData, SelectorVehiculoDialogResult } from '../../models/vehiculoDialog.model';
import { Vehiculo } from '../../models/vehiculo.model';
import { DistribucionService } from '../../services/distribucion.service';


@Component({
  selector: 'app-popup-lote-asignacion-vehiculo',
  standalone: false,
  templateUrl: './popup-lote-asignacion-vehiculo.component.html',
  styleUrl: './popup-lote-asignacion-vehiculo.component.css',
})
export class PopupLoteAsignacionVehiculoComponent implements OnInit{
  idOrden: number;
  detallesOrden: DetalleOrdenDistribucion[] | null = null;
  isLoading: boolean = true;
  isSaving: boolean = false;
  
  // Condición de validez: todos los lotes deben tener un vehículo asignado.
  get isOrderFullyAssigned(): boolean {
    return this.detallesOrden 
        ? this.detallesOrden.every(d => d.idVehiculoAsignado !== null)
        : false;
  }

  constructor(
    public dialogRef: MatDialogRef<PopupLoteAsignacionVehiculoComponent, SelectorVehiculoDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: SelectorVehiculoDialogData,
    private distribucionService: DistribucionService // Servicio para obtener y guardar datos
  ) {
    this.idOrden = data.idOrden;
  }

  ngOnInit(): void {
    this.cargarDetallesOrden();
  }

  /**
   * Carga los detalles de la orden (lotes y productos) y las opciones de vehículo.
   */
  cargarDetallesOrden(): void {
    this.isLoading = true;
    this.distribucionService.getDetallesOrdenParaAsignacion(this.idOrden)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (detalles) => {
          this.detallesOrden = detalles;
        },
        error: (err) => {
          console.error("Error al cargar detalles de la orden:", err);
          alert('Error al cargar detalles de la orden de distribución.');
        }
      });
  }

  /**
   * Se dispara cuando la tabla hija cambia la asignación de un vehículo en un lote.
   * Nota: Aquí se podría realizar un guardado temporal, pero por simplicidad
   * solo actualizamos el estado local.
   */
  onAsignacionChange(detalleActualizado: DetalleOrdenDistribucion): void {
    console.log(`Lote ${detalleActualizado.idLote} asignado a vehículo: ${detalleActualizado.idVehiculoAsignado}`);
    // La mutación ya ocurrió en el array local (detallesOrden) a través de ngModel.
  }

  /**
   * Confirma la asignación de todos los vehículos y cierra el diálogo.
   */
  onConfirmarAsignacion(): void {
    if (!this.isOrderFullyAssigned) {
        alert('Debe asignar un vehículo a todos los lotes antes de confirmar.');
        return;
    }

    if (!this.detallesOrden) return;
    
    this.isSaving = true;

    // 🛑 Llama al servicio para guardar la asignación final
    this.distribucionService.guardarAsignacionVehiculos(this.idOrden, this.detallesOrden)
      .pipe(finalize(() => this.isSaving = false))
      .subscribe({
        next: () => {
          this.dialogRef.close({ success: true, detallesActualizados: this.detallesOrden! });
        },
        error: (err) => {
          console.error('Error al guardar asignación:', err);
          alert('Error al guardar la asignación. Intente de nuevo.');
        }
      });
  }

  /**
   * Cierra el diálogo sin guardar cambios (cancelar).
   */
  onCancelar(): void {
    this.dialogRef.close({ success: false });
  }

}
