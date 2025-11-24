import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovimientoInventario } from '../../models/movimiento_inventario.model';

@Component({
  selector: 'app-popup-reporte-lote',
  templateUrl: './popup-reporte-lote.component.html',
  standalone: false,
  styleUrls: ['./popup-reporte-lote.component.css'],
})
export class PopupReporteLoteComponent {
  @Input() reporte: MovimientoInventario | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() resolverIncidencia = new EventEmitter<string>();

  marcarComoResuelta() {
    // Lógica pendiente de adaptación a la nueva estructura si aplica
    /*
    if (this.reporte.incidencia) {
      this.reporte.incidencia.estado = 'Resuelta';
      this.resolverIncidencia.emit(this.reporte.codigoReporte);
    }
    */
  }

  volver() {
    this.close.emit();
  }
}
