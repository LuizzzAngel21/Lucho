import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenCompraResumen } from '../../models/ordenCompraResumen.model';
import { ComprasService } from '../../services/compras.service';

@Component({
  selector: 'app-historial-compras.component',
  standalone: false,
  templateUrl: './historial-compras.component.html',
  styleUrl: './historial-compras.component.css',
})

export class HistorialComprasComponent implements OnInit{
  ordenesHistoricas: OrdenCompraResumen[] | null = null;
  isLoading: boolean = true;
  filtroBusqueda: string = ''; // Modelo para la barra de búsqueda

  constructor(
    private comprasService: ComprasService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  /**
   * Obtiene la lista de órdenes de compra históricas a través del servicio.
   */
  cargarOrdenes(): void {
    this.isLoading = true;
    // 💡 Asumiendo que ComprasService tiene un método para esto
    this.comprasService.getOrdenesHistoricas().subscribe({
      next: (data) => {
        this.ordenesHistoricas = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar historial de órdenes:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Filtra las órdenes basándose en el texto de búsqueda.
   */
  getOrdenesFiltradas(): OrdenCompraResumen[] | null {
    if (!this.ordenesHistoricas) {
      return null;
    }
    if (!this.filtroBusqueda) {
      return this.ordenesHistoricas;
    }
    const filtro = this.filtroBusqueda.toLowerCase();
    return this.ordenesHistoricas.filter(oc => 
      oc.idOrden.toString().includes(filtro) ||
      oc.idSolicitud.toString().includes(filtro) ||
      oc.proveedorPrincipal.toLowerCase().includes(filtro) ||
      oc.estadoOC.toLowerCase().includes(filtro)
    );
  }

  /**
   * Maneja el evento de la tabla y navega a la página de resumen.
   * @param idOrden El ID de la Orden de Compra para ver el detalle.
   */
  onVerDetalle(idOrden: number): void {
    // 💡 Navega a la página de detalle (orden-compra-resumen)
    this.router.navigate(['/GestionCompras/orden-compra-resumen', idOrden]);
  }

}
