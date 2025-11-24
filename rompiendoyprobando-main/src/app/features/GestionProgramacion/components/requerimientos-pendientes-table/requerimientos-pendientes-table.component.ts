import { Component, Input } from '@angular/core';
import { DetalleRequerimiento } from '../../models/detalle_requerimiento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requerimientos-pendientes-table',
  templateUrl: './requerimientos-pendientes-table.component.html',
  standalone: false,
  styleUrls: ['./requerimientos-pendientes-table.component.css']
})
export class RequerimientosPendientesTableComponent {
  @Input() data: DetalleRequerimiento[] = [];

  displayedColumns: string[] = [
    'id_requerimiento',
    'id_producto',
    'cantidad',
    'observacion',
    'fecha_creacion',
    'fecha_actual',
    'accion'
  ];

  constructor(private router: Router) {}

  atender(row: DetalleRequerimiento) {
    // Navega a disponibilidad-producto pasando id del requerimiento
    this.router.navigate(['/GestionProgramacion/disponibilidad-producto/', row.id_requerimiento]);
  }
}
