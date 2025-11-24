import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Inventario } from '../../models/inventario.model';

@Component({
  selector: 'app-lista-inventario-table',
  templateUrl: './lista-inventario-table.component.html',
  standalone: false,
  styleUrls: ['./lista-inventario-table.component.css'],
})
export class ListaInventarioTableComponent {
  @Input() data: Inventario[] = [];
  @Output() selectedChange = new EventEmitter<Inventario | null>();
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
    'reporte', // Nuevo botón Ver Reporte Lote
    'acciones', // Radio selección
  ];

  private selectedId: number | null = null;

  isSelected(row: Inventario): boolean {
    return this.selectedId === row.id_inventario;
  }

  toggleSelection(row: Inventario) {
    if (this.isSelected(row)) {
      this.selectedId = null;
      this.selectedChange.emit(null);
    } else {
      this.selectedId = row.id_inventario;
      this.selectedChange.emit(row);
    }
  }

  verReporteLote(row: Inventario) {
    this.verReporte.emit(row);
  }
}
