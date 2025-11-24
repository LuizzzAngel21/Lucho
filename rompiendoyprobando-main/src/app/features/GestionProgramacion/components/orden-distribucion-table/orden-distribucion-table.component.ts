import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DetalleOrdenDistribucion } from '../../models/detalle_ordenDistribucion';

@Component({
	selector: 'app-orden-distribucion-table',
	standalone: true,
	imports: [CommonModule, MatTableModule, MatButtonModule],
	templateUrl: './orden-distribucion-table.component.html',
	styleUrls: ['./orden-distribucion-table.component.css']
})
export class OrdenDistribucionTableComponent {
	@Input() data: DetalleOrdenDistribucion[] = [];
	@Output() verDetalle = new EventEmitter<string>(); // id_orden_dist

	displayedColumns: string[] = [
		'id_orden_dist',
		'id_lote',
		'id_producto',
		'cantidad',
		'condiciones_transporte',
		'temperatura_requerida',
		'observaciones',
		'fecha_creacion',
		'acciones'
	];

	onVerDetalle(row: DetalleOrdenDistribucion) {
		this.verDetalle.emit(row.id_orden_dist);
	}
}
