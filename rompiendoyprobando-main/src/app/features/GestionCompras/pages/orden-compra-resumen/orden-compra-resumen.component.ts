import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from '../../services/compras.service';
import { ResumenCompra } from '../../models/resumenCompra.model';
import { OrdenCompraResumen } from '../../models/ordenCompraResumen.model';

const IGV_RATE = 0.18;

@Component({
  selector: 'app-orden-compra-resumen.component',
  standalone: false,
  templateUrl: './orden-compra-resumen.component.html',
  styleUrl: './orden-compra-resumen.component.css',
})
export class OrdenCompraResumenComponent implements OnInit{

  idOrden: number = 0;
  detalleOrden: OrdenCompraResumen | null = null; // Detalle principal de la OC
  productosResumen: ResumenCompra[] | null = null; // Productos con proveedores/precios finales
  justificacionCompra: string = ''; // Justificación que se guardó en la cotización

  isLoading: boolean = true;
  
  // Propiedades de cálculo (similares a la cotización, pero aquí se leen del modelo)
  get subtotalGeneral(): number {
    return this.productosResumen
      ? this.productosResumen.reduce((sum, p) => sum + (p.subtotal || 0), 0)
      : 0;
  }
  
  get igv(): number {
    return this.subtotalGeneral * IGV_RATE;
  }

  get costoTotal(): number {
    return this.subtotalGeneral + this.igv;
  }

  constructor(
    private route: ActivatedRoute, // Para leer el ID de la URL
    private comprasService: ComprasService,
    // private router: Router // Para navegar de vuelta
  ) {}

  ngOnInit(): void {
    // 1. Obtener el ID de la Orden de la URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('idOrden');
      if (id) {
        this.idOrden = +id;
        this.cargarResumenOrden(this.idOrden);
      } else {
        console.error('ID de Orden de Compra no encontrado en la URL.');
        this.isLoading = false;
      }
    });
  }

  /**
   * Carga los detalles de la Orden de Compra desde el servicio.
   * @param id El ID de la Orden de Compra.
   */
  cargarResumenOrden(id: number): void {
    this.isLoading = true;
    
    // Asumimos que el servicio tiene un método que devuelve todos los detalles de la OC
    this.comprasService.getDetalleOrdenCompra(id).subscribe({
      next: (data) => {
        this.detalleOrden = data.resumen; // Detalles generales (header)
        this.productosResumen = data.productos; // Lista de productos (tabla)
        this.justificacionCompra = data.justificacion; // Justificación guardada
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar resumen de orden:', error);
        this.isLoading = false;
        // Manejar el error
      }
    });
  }
  
  /**
   * Simula la impresión o descarga del documento.
   */
  onImprimirOrden(): void {
    alert(`Generando PDF o imprimiendo la Orden de Compra N° ${this.idOrden}.`);
  }
}
