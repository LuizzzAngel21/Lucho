import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { LoteProducto } from '../../models/lotes_producto.model';

@Component({
	selector: 'app-popup-revisar-stock-producto',
	standalone: true,
	imports: [CommonModule, MatTableModule, MatButtonModule],
	templateUrl: './popup-revisar-stock-producto.component.html',
	styleUrls: ['./popup-revisar-stock-producto.component.css']
})
export class PopupRevisarStockProductoComponent {
	@Input() nombreProducto = '';
	@Input() lotes: LoteProducto[] = [];
	@Output() close = new EventEmitter<void>();

	displayedColumns: string[] = [
		'numero_lote',
		'fecha_fabricacion',
		'fecha_vencimiento',
		'cantidad_actual',
		'ubicacion_almacen',
		'temperatura_almacenamiento',
		'fecha_creacion'
	];
}
