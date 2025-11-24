import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ConfirmacionDialogData, ConfirmacionDialogResult } from '../../models/confirmacionDialog.model';


@Component({
  selector: 'app-popup-cancelar-orden',
  standalone: false,
  templateUrl: './popup-cancelar-orden.component.html',
  styleUrl: './popup-cancelar-orden.component.css',
})
export class PopupCancelarOrdenComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupCancelarOrdenComponent, ConfirmacionDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmacionDialogData
  ) {}

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
