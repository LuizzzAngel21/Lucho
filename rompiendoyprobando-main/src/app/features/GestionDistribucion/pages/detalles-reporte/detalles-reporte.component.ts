import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DistribucionService } from '../../services/distribucion.service';
import { DetalleOrdenCompleta } from '../../models/incidenciasModels/detalleReporteCompleto.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-detalles-reporte.component',
  standalone: false,
  templateUrl: './detalles-reporte.component.html',
  styleUrl: './detalles-reporte.component.css',
})
export class DetallesReporteComponent implements OnInit{
  idOrden: number | null = null;
  detalleCompleto: DetalleOrdenCompleta | null = null;
  isLoading: boolean = true;
  errorCarga: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private distribucionService: DistribucionService
  ) {}

  ngOnInit(): void {
    // 1. Obtener el ID de la Orden de la URL y cargar los datos
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('idOrden');
        if (id) {
          this.idOrden = +id;
          return this.distribucionService.getDetalleReporteOrden(this.idOrden); // Necesitamos este método
        }
        this.errorCarga = 'ID de Orden no proporcionado.';
        return of(null);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (data) => {
        if (data) {
          this.detalleCompleto = data;
        }
      },
      error: (error) => {
        console.error('Error al cargar detalle de reporte:', error);
        this.errorCarga = 'Ocurrió un error al intentar cargar el reporte completo.';
      }
    });
  }
  
  /**
   * Navega de vuelta a la lista principal de reportes.
   */
  goBack(): void {
    this.router.navigate(['/GestionDistribucion/reportes']);
  }
}
