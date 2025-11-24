import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { DistribucionService } from '../../services/distribucion.service';
import { OrdenReporte } from '../../models/incidenciasModels/ordenReporte.model';


@Component({
  selector: 'app-reportes-entrega-list.component',
  standalone: false,
  templateUrl: './reportes-entrega-list.component.html',
  styleUrl: './reportes-entrega-list.component.css',
})
export class ReportesEntregaListComponent implements OnInit {
  ordenesEntregadas: OrdenReporte[] | null = null;
  isLoading: boolean = true;
  filtroBusqueda: string = '';

  constructor(
    private distribucionService: DistribucionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarReporteOrdenes();
  }

  /**
   * Carga las órdenes de distribución que tienen estado 'Completada'.
   */
  cargarReporteOrdenes(): void {
    this.isLoading = true;
    this.distribucionService.getReporteOrdenesEntregadas() // Necesitamos crear este método
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.ordenesEntregadas = data;
        },
        error: (error) => {
          console.error('Error al cargar reporte de órdenes:', error);
        }
      });
  }

  /**
   * Filtra las órdenes basándose en el texto de búsqueda.
   */
  getOrdenesFiltradas(): OrdenReporte[] | null {
    if (!this.ordenesEntregadas) {
      return null;
    }
    if (!this.filtroBusqueda) {
      return this.ordenesEntregadas;
    }
    const filtro = this.filtroBusqueda.toLowerCase();
    return this.ordenesEntregadas.filter(o => 
      o.idOrden.toString().includes(filtro) ||
      o.nombreUsuario.toLowerCase().includes(filtro) ||
      o.area.toLowerCase().includes(filtro)
    );
  }

  /**
   * Acción: Navega a la vista de detalle de la orden completa.
   */
  onVerDetalles(idOrden: number): void {
    this.router.navigate(['/GestionDistribucion/reportes/detalles', idOrden]);
  }

  /**
   * Acción: Navega a la vista de lista de incidencias para la orden.
   */
  onVerIncidencias(idOrden: number): void {
    this.router.navigate(['/GestionDistribucion/reportes/incidencias', idOrden]);
  }

}
