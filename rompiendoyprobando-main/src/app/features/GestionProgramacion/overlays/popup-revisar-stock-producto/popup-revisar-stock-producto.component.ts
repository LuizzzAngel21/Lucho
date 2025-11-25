import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { LoteProducto } from '../../models/lotes_producto.model';

import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-popup-revisar-stock-producto',
	standalone: true,
	imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
	templateUrl: './popup-revisar-stock-producto.component.html',
	styleUrls: ['./popup-revisar-stock-producto.component.css']
})
export class PopupRevisarStockProductoComponent {
	@Input() nombreProducto = '';
	@Input() lotes: LoteProducto[] = [];
	@Output() close = new EventEmitter<void>();
	@Output() selectLote = new EventEmitter<number>(); // Emitir ID del lote seleccionado

	displayedColumns: string[] = [
		'numero_lote',
		'fecha_fabricacion',
		'fecha_vencimiento',
		'cantidad_actual',
		'ubicacion_almacen',
		'temperatura_almacenamiento',
		'fecha_creacion',
		'acciones' // New column
	];

	seleccionar(lote: any) {
		if (lote.id_lote) {
			this.selectLote.emit(lote.id_lote);
			this.close.emit();
		} else {
			alert('Error: Este lote no tiene ID válido.');
		}
	}
}
