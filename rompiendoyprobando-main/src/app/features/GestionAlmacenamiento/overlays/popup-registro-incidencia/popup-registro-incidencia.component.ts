import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-registro-incidencia',
  templateUrl: './popup-registro-incidencia.component.html',
  standalone: false,
  styleUrls: ['./popup-registro-incidencia.component.css']
})
export class PopupRegistroIncidenciaComponent {
  @Output() close = new EventEmitter<void>();
  @Output() registrarIncidencia = new EventEmitter<any>();

  incidenciaData = {
    idLote: 'L001',
    producto: 'P001 - Aspirina',
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '',
    transporte: '',
    prioridad: 'MEDIA',
    estado: 'Pendiente'
  };

  cancelar() {
    this.close.emit();
  }

  registrar() {
    console.log('📦 Incidencia registrada:', this.incidenciaData);
    this.registrarIncidencia.emit(this.incidenciaData);
    this.close.emit();
  }
}
