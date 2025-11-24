import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-observaciones-accion-registrar',
  templateUrl: './observaciones-accion-registrar.component.html',
  styleUrls: ['./observaciones-accion-registrar.component.css'],
  standalone: false,
})
export class ObservacionesAccionRegistrarComponent {
  observaciones: string = '';

  @Output() registrarConIncidencia = new EventEmitter<string>();
  @Output() registrarLote = new EventEmitter<string>();

  emitirConIncidencia(): void {
    this.registrarConIncidencia.emit(this.observaciones);
  }

  emitirRegistrar(): void {
    this.registrarLote.emit(this.observaciones);
  }
}
