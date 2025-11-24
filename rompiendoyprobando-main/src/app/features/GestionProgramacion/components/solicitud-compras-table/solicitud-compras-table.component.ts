import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DetalleSolicitud } from '../../models/detalle_solicitud';

@Component({
	selector: 'app-solicitud-compras-table',
	standalone: true,
	imports: [CommonModule, MatTableModule, MatButtonModule],
	templateUrl: './solicitud-compras-table.component.html',
	styleUrls: ['./solicitud-compras-table.component.css']
})
export class SolicitudComprasTableComponent {
	@Input() data: DetalleSolicitud[] = [];
	@Output() verDetalle = new EventEmitter<string>(); // id_solicitud

	displayedColumns: string[] = [
		'id_solicitud',
		'id_producto',
		'cantidad',
		'observacion',
		'fecha_creacion',
		'fecha_actual',
		'acciones'
	];

	onVerDetalle(row: DetalleSolicitud) {
		this.verDetalle.emit(row.id_solicitud);
	}
}
