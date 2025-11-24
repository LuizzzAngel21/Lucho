import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DetalleOrdenDistribucion } from '../../models/detalle_ordenDistribucion';

@Component({
	selector: 'app-popup-detalle-orden-distribucion',
	templateUrl: './popup-detalle-ordenDistribucion.component.html',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule],
	styleUrls: ['./popup-detalle-ordenDistribucion.component.css']
})
export class PopupDetalleOrdenDistribucionComponent {
	@Input() data: DetalleOrdenDistribucion[] = [];
	@Output() close = new EventEmitter<void>();
	@Output() atender = new EventEmitter<DetalleOrdenDistribucion>();

	displayedColumns: string[] = [
		'id_orden_dist',
		'id_lote',
		'id_producto',
		'cantidad',
		'condiciones_transporte',
		'temperatura_requerida',
		'observaciones',
		'fecha_creacion'
	];
}
