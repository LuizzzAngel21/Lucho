import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { IncidenciaReporte } from '../../models/incidenciasModels/incidenciaReporte.model';

@Component({
  selector: 'app-reporte-incidencias-table',
  standalone: false,
  templateUrl: './reporte-incidencias-table.component.html',
  styleUrl: './reporte-incidencias-table.component.css',
})
export class ReporteIncidenciasTableComponent {
  @Input() incidencias: IncidenciaReporte[] | null = []; 

  displayedColumns: string[] = [
    'fechaReporte', 
    'tipoIncidencia', 
    'impacto', 
    'idLoteAfectado',
    'descripcion', 
    'usuarioReporta'
  ];

  /**
   * Determina la clase de estilo para el impacto de la incidencia.
   */
  getImpactoClass(impacto: 'Bajo' | 'Moderado' | 'Alto'): string {
    switch (impacto) {
      case 'Alto':
        return 'impacto-alto';
      case 'Moderado':
        return 'impacto-moderado';
      case 'Bajo':
      default:
        return 'impacto-bajo';
    }
  }

}
