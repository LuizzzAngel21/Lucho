import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IncidenciaReporte } from '../../models/incidenciasModels/incidenciaReporte.model';
import { DistribucionService } from '../../services/distribucion.service';


@Component({
  selector: 'app-incidencias-reporte.component',
  standalone: false,
  templateUrl: './incidencias-reporte.component.html',
  styleUrl: './incidencias-reporte.component.css',
})
export class IncidenciasReporteComponent implements OnInit{
  idOrden: number | null = null;
  incidencias: IncidenciaReporte[] | null = null;
  isLoading: boolean = true;
  errorCarga: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private distribucionService: DistribucionService
  ) {}

  ngOnInit(): void {
    // 1. Obtener el ID de la Orden de la URL
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('idOrden');
        if (id) {
          this.idOrden = +id;
          return this.distribucionService.getIncidenciasByOrdenId(this.idOrden); // 2. Llamada al servicio
        }
        this.errorCarga = 'ID de Orden no proporcionado en la URL.';
        return of(null);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (data) => {
        if (data) {
          this.incidencias = data;
        }
      },
      error: (error) => {
        this.errorCarga = 'Ocurrió un error al intentar cargar las incidencias desde el servidor.';
        this.incidencias = [];
      }
    });
  }
  
  /**
   * Navega de vuelta a la lista principal de reportes.
   */
  goBack(): void {
    this.router.navigate(['/GestionDistribucion/reportes/entregas']);
  }

}
