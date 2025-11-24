import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LotesProducto } from '../../models/lotes_producto.model';

@Component({
  selector: 'app-lotes-recibidos-table',
  templateUrl: './lotes-recibidos-table.component.html',
  standalone: false,
  styleUrls: ['./lotes-recibidos-table.component.css'],
})
export class LotesRecibidosTableComponent {
  @Input() data: LotesProducto[] = [];
  @Output() registrarLote = new EventEmitter<LotesProducto>();

  displayedColumns: string[] = [
    'id_lote',
    'id_producto',
    'id_orden_compra',
    'numero_lote',
    'fecha_fabricacion',
    'cantidad_inicial',
    'cantidad_actual',
    'estado',
    'acciones',
  ];
}
