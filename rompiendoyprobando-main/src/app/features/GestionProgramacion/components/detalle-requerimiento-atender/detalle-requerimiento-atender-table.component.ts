import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Producto } from '../../models/producto.model';

interface ProductoDecision extends Producto { decision?: 'COMPRAS' | 'DISTRIBUCION'; }

@Component({
  selector: 'app-detalle-requerimiento-atender-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './detalle-requerimiento-atender-table.component.html',
  styleUrls: ['./detalle-requerimiento-atender-table.component.css']
})
export class DetalleRequerimientoAtenderTableComponent {
  @Input() data: ProductoDecision[] = [];
  @Input() observaciones = '';
  @Output() observacionesChange = new EventEmitter<string>();
  @Output() atender = new EventEmitter<{ productos: ProductoDecision[]; observaciones: string }>();
  @Output() revisarStock = new EventEmitter<ProductoDecision>();
  @Output() volver = new EventEmitter<void>();

  displayedColumns: string[] = [
    'revisar',
    'id_producto',
    'nombre_producto',
    'descripcion_producto',
    'cantidadsolicitada',
    'codigo_digemid',
    'registro_sanitario',
    'id_tipo',
    'id_forma',
    'estado',
    'decision'
  ];

  onDecisionChange() {}

  todasDecisionesTomadas(): boolean {
    return this.data.length > 0 && this.data.every(p => !!p.decision);
  }

  emitirAtender() {
    if (this.todasDecisionesTomadas()) {
      this.atender.emit({ productos: this.data, observaciones: this.observaciones });
    }
  }
}
