import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { ConfirmacionDialogData, ConfirmacionDialogResult } from '../../models/confirmacionDialog.model';



@Component({
  selector: 'app-popup-confirmacion-entrega',
  standalone: false,
  templateUrl: './popup-confirmacion-entrega.component.html',
  styleUrl: './popup-confirmacion-entrega.component.css',
})
export class PopupConfirmacionEntregaComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupConfirmacionEntregaComponent, ConfirmacionDialogResult>,
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
