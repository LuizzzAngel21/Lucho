import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ConfirmacionDialogData, ConfirmacionDialogResult } from '../../models/ProveedorModels/proveedorDelete';

@Component({
  selector: 'app-popup-confirmacion-eliminacion',
  standalone: false, 
  templateUrl: './popup-confirmacion-eliminacion.component.html',
  styleUrl: './popup-confirmacion-eliminacion.component.css',
})
export class PopupConfirmacionEliminacionComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupConfirmacionEliminacionComponent, ConfirmacionDialogResult>,
    // Inyectar los datos de entrada
    @Inject(MAT_DIALOG_DATA) public data: ConfirmacionDialogData
  ) {}

  /**
   * Cierra el diálogo devolviendo true (Sí, confirmar).
   */
  onConfirmar(): void {
    this.dialogRef.close({ confirmado: true });
  }

  /**
   * Cierra el diálogo devolviendo false (No, cancelar).
   */
  onCancelar(): void {
    this.dialogRef.close({ confirmado: false });
  }

}
