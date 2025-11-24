import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Vehiculo } from '../../models/vehiculo.model';
import { DistribucionService } from '../../services/distribucion.service';
import { InfoVehiculoDialogData } from '../../models/vehiculoDialog.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-popup-info-vehiculo',
  standalone: false,
  templateUrl: './popup-info-vehiculo.component.html',
  styleUrl: './popup-info-vehiculo.component.css',
})
export class PopupInfoVehiculoComponent implements OnInit{
  

  vehiculo: Vehiculo | null = null;
  isLoading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<PopupInfoVehiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InfoVehiculoDialogData,
    private distribucionService: DistribucionService
  ) {}

  ngOnInit(): void {
    this.cargarInfoVehiculo(this.data.idVehiculo);
  }

  /**
   * Carga la información detallada del vehículo.
   */
  cargarInfoVehiculo(idVehiculo: number): void {
    this.isLoading = true;
    this.distribucionService.getInfoVehiculo(idVehiculo)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (vehiculo) => {
          this.vehiculo = vehiculo;
        },
        error: (err) => {
          console.error("Error al cargar información del vehículo:", err);
          alert('Error al cargar la información del vehículo.');
        }
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}


