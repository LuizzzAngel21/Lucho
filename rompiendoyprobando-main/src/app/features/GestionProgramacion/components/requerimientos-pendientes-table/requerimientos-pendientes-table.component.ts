import { Component, Input } from '@angular/core';
import { Requerimiento } from '../../services/programacion.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-requerimientos-pendientes-table',
  templateUrl: './requerimientos-pendientes-table.component.html',
  standalone: false,
  styleUrls: ['./requerimientos-pendientes-table.component.css']
})
export class RequerimientosPendientesTableComponent {
  @Input() data: Requerimiento[] = [];


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

  atender(row: Requerimiento) {
    // Navega a disponibilidad-producto pasando id del requerimiento
    this.router.navigate(['/GestionProgramacion/disponibilidad-producto/', row.id_req]);
  }
}
