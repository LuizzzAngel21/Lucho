import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DetalleSolicitud } from '../../models/detalle_solicitud';

@Component({
  selector: 'app-popup-detalle-solicitud-de-compra',
  templateUrl: './popup-detalle-solicitud-de-compra.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  styleUrls: ['./popup-detalle-solicitud-de-compra.component.css']
})
export class PopupDetalleSolicitudDeCompraComponent {
  @Input() data: DetalleSolicitud[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() atender = new EventEmitter<DetalleSolicitud>();

  displayedColumns: string[] = [
    'id_solicitud',
    'id_producto',
    'cantidad',
    'observacion',
    'fecha_creacion',
    'fecha_actual'
  ];
}
