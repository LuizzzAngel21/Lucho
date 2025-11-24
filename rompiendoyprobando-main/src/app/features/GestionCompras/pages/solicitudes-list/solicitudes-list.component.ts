import { Component, OnInit } from '@angular/core';
import { SolicitudCompra } from '../../models/solicitudCompra.model';
import { ComprasService } from '../../services/compras.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes-list.component',
  standalone: false,
  templateUrl: './solicitudes-list.component.html',
  styleUrl: './solicitudes-list.component.css',
})
export class SolicitudesListComponent implements OnInit{

  solicitudesPendientes: SolicitudCompra[] | null = null;
  isLoading: boolean = true;
  filtroBusqueda: string = ''; // Modelo para la barra de búsqueda

  constructor(
    private comprasService: ComprasService,
    private router: Router // Inyección del Router para navegación
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  /**
   * Obtiene la lista de solicitudes pendientes a través del servicio.
   */
  cargarSolicitudes(): void {
    this.isLoading = true;
    this.comprasService.getSolicitudesPendientes().subscribe({
      next: (data) => {
        this.solicitudesPendientes = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar solicitudes:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Maneja el evento de la tabla para ir a la cotización (Acción).
   * Ejecuta la navegación basada en el ID.
   * @param solicitud El objeto SolicitudCompra completo.
   */
  onVerCotizacion(solicitud: SolicitudCompra): void {
    // 💡 Ejecuta la navegación a la página de cotización con el ID
    this.router.navigate(['/GestionCompras/cotizacion-generacion', solicitud.idSolicitud]);
  }
  
  // 💡 Implementar filtro de búsqueda
  getSolicitudesFiltradas(): SolicitudCompra[] | null {
    if (!this.solicitudesPendientes) {
      return null;
    }
    if (!this.filtroBusqueda) {
      return this.solicitudesPendientes;
    }
    const filtro = this.filtroBusqueda.toLowerCase();
    return this.solicitudesPendientes.filter(s => 
      s.solicitante.toLowerCase().includes(filtro) ||
      s.area.toLowerCase().includes(filtro) ||
      s.idSolicitud.toString().includes(filtro)
    );
  }
}
