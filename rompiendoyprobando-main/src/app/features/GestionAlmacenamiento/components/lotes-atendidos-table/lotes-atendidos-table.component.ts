import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Inventario } from '../../models/inventario.model';

@Component({
  selector: 'app-lotes-atendidos-table',
  templateUrl: './lotes-atendidos-table.component.html',
  standalone: false,
  styleUrls: ['./lotes-atendidos-table.component.css'],
})
export class LotesAtendidosTableComponent {
  @Input() data: Inventario[] = [];
  @Output() verReporte = new EventEmitter<Inventario>();

  displayedColumns: string[] = [
    'id_inventario',
    'id_almacen',
    'id_lote',
    'stock_actual',
    'stock_minimo',
    'stock_maximo',
    'ubicacion_especifica',
    'fecha_creacion',
    'acciones',
  ];
}
