import { Component } from '@angular/core';
import { ProductoCotizacion } from '../../models/productoCotizacion.model';
import { ProveedorProductoCotizacion } from '../../models/proveedorProductoCotizacion.model';
import { PopupProveedorProductoComponent } from '../../overlays/popup-proveedor-producto/popup-proveedor-producto.component';
import { ComprasService } from '../../services/compras.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupProveedorProductoResult } from '../../models/dialogData.model';
import { finalize } from 'rxjs';

const IGV_RATE = 0.18;

@Component({
  selector: 'app-cotizacion-generacion.component',
  standalone: false,
  templateUrl: './cotizacion-generacion.component.html',
  styleUrl: './cotizacion-generacion.component.css',
})
export class CotizacionGeneracionComponent {

  idSolicitud: number = 0;
  productosACotizar: ProductoCotizacion[] | null = null;
  isLoading: boolean = true;
  isConfirming: boolean = false;
  
  // 👉 NUEVA PROPIEDAD: Justificación editable
  justificacionUsuario: string = ''; 

  // 👉 PROPIEDADES DE CÁLCULO (getters para cálculo dinámico)
  get subtotalGeneral(): number {
    return this.productosACotizar
      ? this.productosACotizar.reduce((sum, p) => sum + (p.subtotal || 0), 0)
      : 0;
  }
  
  get igv(): number {
    // Si el IGV no se aplica, este valor sería 0.
    // Asumiendo que se aplica sobre el subtotal general:
    return this.subtotalGeneral * IGV_RATE;
  }

  get costoTotal(): number {
    return this.subtotalGeneral + this.igv;
  }
  
  get puedeConfirmarCompra(): boolean {
    // La compra se puede confirmar si hay productos y si todos tienen un proveedor y precio seleccionado.
    if (!this.productosACotizar || this.productosACotizar.length === 0) {
      return false;
    }
    const todosCotizados = this.productosACotizar.every(p => 
      p.idProveedorSeleccionado !== null && 
      p.precioUnitarioReferencial !== null && 
      p.precioUnitarioReferencial > 0
    );
    // Además, podría requerir una justificación si hay desvíos o si es un requerimiento del proceso.
    // Por ahora, solo validamos la cotización y la justificación.
    return todosCotizados && this.justificacionUsuario.trim().length > 10; 
  }

  // ... (Constructor y ngOnInit sin cambios) ...

  constructor(
    private route: ActivatedRoute,
    private comprasService: ComprasService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('idSolicitud');
      if (id) {
        this.idSolicitud = +id;
        this.cargarProductosCotizacion(this.idSolicitud);
      } else {
        this.isLoading = false;
      }
    });
  }

  cargarProductosCotizacion(id: number): void {
    this.isLoading = true;
    this.comprasService.getProductosBySolicitudId(id).subscribe({
      next: (data) => {
        // Inicializar el subtotal
        this.productosACotizar = data.map(p => ({
            ...p,
            subtotal: (p.precioUnitarioReferencial || 0) * p.cantidadSolicitada
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos de cotización:', error);
        this.isLoading = false;
      }
    });
  }

  onAbrirSelectorProveedor(producto: ProductoCotizacion): void {
    const dialogRef = this.dialog.open(PopupProveedorProductoComponent, {
      width: '800px',
      data: { producto: producto }
    });

    dialogRef.afterClosed().subscribe((result: PopupProveedorProductoResult) => {
      if (result && result.proveedorSeleccionado) {
        this.actualizarProducto(producto, result.proveedorSeleccionado);
      }
    });
  }

  actualizarProducto(producto: ProductoCotizacion, proveedor: ProveedorProductoCotizacion): void {
    if (!this.productosACotizar) return;

    const index = this.productosACotizar.findIndex(p => p.idProducto === producto.idProducto);

    if (index !== -1) {
      const productoActualizado = { ...this.productosACotizar[index] };
      
      productoActualizado.idProveedorSeleccionado = proveedor.id;
      productoActualizado.nombreProveedorSeleccionado = proveedor.nombreProveedor;
      productoActualizado.precioUnitarioReferencial = proveedor.precioReferencial;
      productoActualizado.subtotal = producto.cantidadSolicitada * proveedor.precioReferencial;

      this.productosACotizar[index] = productoActualizado;
      this.productosACotizar = [...this.productosACotizar]; // Forzar Detección de Cambios
    }
  }

  onProductoActualizado(producto: ProductoCotizacion): void {
    // Forzar la reevaluación de los getters (totales)
    this.productosACotizar = [...(this.productosACotizar || [])];
  }
  
  // 🛑 MÉTODO ELIMINADO: Ya no se usa para mostrar datos, solo para cargar
  // getProductosFiltrados(): ProductoCotizacion[] | null { /* ... */ }

  onVerHistorial(): void {
    alert(`Ver Historial de la Solicitud #${this.idSolicitud}`);
  }

  onConfirmarCompra(): void {
    if (!this.puedeConfirmarCompra) {
      alert('Debe seleccionar proveedor y precio para todos los productos y proporcionar una justificación.');
      return;
    }
    
    // 1. Iniciar estado de carga y deshabilitar botón
    this.isConfirming = true;
    
    // 2. Llamar al servicio para generar la OC
    this.comprasService.confirmarCotizacion(
      this.idSolicitud,
      this.productosACotizar!, // Ya validado que no es null/vacio
      this.justificacionUsuario
    ).pipe(
        // Finalizar el estado de carga/confirmación
        finalize(() => this.isConfirming = false)
    )
    .subscribe({
        next: (resumenOrden) => {
            console.log('Cotización Confirmada. OC Generada:', resumenOrden.idOrden);
            
            // 3. Navegar a la página de resumen de la orden recién creada
            this.router.navigate(['/GestionCompras/orden-compra-resumen', resumenOrden.idOrden]);
            
        },
        error: (error) => {
            console.error('Error al generar la Orden de Compra:', error);
            alert('Error: No se pudo generar la Orden de Compra. Inténtelo de nuevo.');
        }
    });
  }
}
