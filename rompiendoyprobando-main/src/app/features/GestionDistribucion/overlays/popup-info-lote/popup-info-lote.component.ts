import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { InfoLoteDialogData } from '../../models/seguimientoDialog.model';
import { LoteProducto } from '../../models/loteProducto.model';
import { DistribucionService } from '../../services/distribucion.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-popup-info-lote',
  standalone: false, 
  templateUrl: './popup-info-lote.component.html',
  styleUrl: './popup-info-lote.component.css',
})
export class PopupInfoLoteComponent implements OnInit{
  lote: LoteProducto | null = null;
  isLoading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<PopupInfoLoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InfoLoteDialogData,
    private distribucionService: DistribucionService
  ) {}

  ngOnInit(): void {
    this.cargarInfoLote(this.data.idLote);
  }

  cargarInfoLote(idLote: number): void {
    this.isLoading = true;
    this.distribucionService.getInfoLote(idLote)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (lote) => {
          this.lote = lote;
        },
        error: (err) => {
          console.error("Error al cargar información del lote:", err);
          alert('Error al cargar la información del lote.');
        }
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
