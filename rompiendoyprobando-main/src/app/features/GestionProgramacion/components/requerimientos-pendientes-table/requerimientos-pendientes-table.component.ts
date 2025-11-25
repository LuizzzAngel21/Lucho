import { Component, Input } from '@angular/core';
import { RequerimientoPendiente } from '../../services/programacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requerimientos-pendientes-table',
  templateUrl: './requerimientos-pendientes-table.component.html',
  standalone: false,
  styleUrls: ['./requerimientos-pendientes-table.component.css']
})
export class RequerimientosPendientesTableComponent {
  @Input() data: RequerimientoPendiente[] = [];

  displayedColumns: string[] = [
    'id_req',
    'id_usr',
    'id_dep',
    'fecha',
    'prioridad',
    'status_req',
    'accion'
  ];

  constructor(private router: Router) { }

  atender(row: RequerimientoPendiente) {
    // Navega a disponibilidad-producto pasando id del requerimiento
    this.router.navigate(['/GestionProgramacion/disponibilidad-producto/', row.id_req]);
  }
}
