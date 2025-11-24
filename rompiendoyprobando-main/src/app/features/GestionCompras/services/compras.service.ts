import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs';

import { ProductoCotizacion } from '../models/productoCotizacion.model';
import { SolicitudCompra } from '../models/solicitudCompra.model';
import { ProveedorProductoCotizacion } from '../models/proveedorProductoCotizacion.model';
import { OrdenCompraResumen } from '../models/ordenCompraResumen.model';
import { OrdenCompraDetalle } from '../models/ordenCompraDetalle.model';
import { ProveedorService } from './proveedor.service';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  constructor(private proveedorService: ProveedorService) {}

  /**
   * Obtiene la lista de solicitudes de compra pendientes.
   */
  getSolicitudesPendientes(): Observable<SolicitudCompra[]> {
    // 💡 Implementación real: Llamada HTTP al backend
    // Por ahora, simulamos datos:
    const mockData: SolicitudCompra[] = [
      { idSolicitud: 1001, area: 'IT', solicitante: 'Juan Pérez', fechaCreacion: '2025-11-15', estado: 'Pendiente', motivo: 'Necesidad de renovación de equipos.' },
      { idSolicitud: 1002, area: 'Marketing', solicitante: 'Ana Gómez', fechaCreacion: '2025-11-16', estado: 'En Cotización', motivo: 'Material para campaña publicitaria.' },
    ];
    return of(mockData);
  }

  /**
   * Obtiene los productos específicos de una solicitud listos para ser cotizados.
   * Usado en: CotizacionGeneracionComponent
   * @param idSolicitud El ID de la solicitud a cotizar.
   */
  getProductosBySolicitudId(idSolicitud: number): Observable<ProductoCotizacion[]> {
    // 💡 Implementación simulada de datos (MOCK DATA)
    console.log(`[Service] Cargando productos para Solicitud #${idSolicitud}`);
    
    const mockProductos: ProductoCotizacion[] = [
        // Datos para que la tabla se muestre
        { idProducto: 101, nombreProducto: 'Monitor LED 24"', cantidadSolicitada: 5, idProveedorSeleccionado: null, nombreProveedorSeleccionado: null, precioUnitarioReferencial: null, subtotal: null },
        { idProducto: 102, nombreProducto: 'Impresora Láser', cantidadSolicitada: 2, idProveedorSeleccionado: null, nombreProveedorSeleccionado: null, precioUnitarioReferencial: null, subtotal: null },
        { idProducto: 103, nombreProducto: 'Teclado Mecánico', cantidadSolicitada: 15, idProveedorSeleccionado: null, nombreProveedorSeleccionado: null, precioUnitarioReferencial: null, subtotal: null },
    ];
    return of(mockProductos);
  }

  /**
   * Obtiene los proveedores disponibles para un ID de producto específico.
   * @param productoId El ID del producto a cotizar.
   */
  getProveedoresByProductoId(productoId: number): Observable<ProveedorProductoCotizacion[]> {
    // 1. Obtener la lista maestra del ProveedorService
    return this.proveedorService.getListadoProveedores().pipe(
        map((proveedoresMaestros) => {
            
            // 2. Filtrar solo proveedores Activos (estado: true)
            const proveedoresActivos = proveedoresMaestros.filter(p => p.estado === true);

            // 3. Transformar y asignar el precio referencial mock
            const proveedoresCotizacion: ProveedorProductoCotizacion[] = proveedoresActivos
                .map(proveedor => {
                    // Simulación de precio: se genera un precio diferente basado en el ID
                    const mockPrice = 250.00 + (proveedor.id % 3) * 5.00; 

                    return {
                        ...proveedor,
                        precioReferencial: mockPrice
                    } as ProveedorProductoCotizacion;
                });
            
            return proveedoresCotizacion;
        })
    );
  }


  /**
   * Confirma la cotización y genera la Orden de Compra (OC).
   * Usado en: CotizacionGeneracionComponent (botón Confirmar Compra)
   * @param idSolicitud El ID de la solicitud.
   * @param productos Lista final de productos cotizados.
   * @param justificacion La justificación del usuario.
   */
  confirmarCotizacion(
    idSolicitud: number, 
    productos: ProductoCotizacion[], 
    justificacion: string
  ): Observable<OrdenCompraResumen> {
    // 💡 Aquí iría la llamada: return this.http.post<OrdenCompraResumen>('/api/ordenes/generar', { idSolicitud, productos, justificacion });
    
    // Simulando la OC generada
    const monto = productos.reduce((sum, p) => sum + (p.subtotal || 0), 0) * (1 + 0.18);
    const resumen: OrdenCompraResumen = {
        idOrden: Math.floor(Math.random() * 1000) + 5000, 
        idSolicitud: idSolicitud, 
        proveedorPrincipal: productos[0]?.nombreProveedorSeleccionado || 'Múltiples', 
        fechaGeneracion: new Date(), 
        montoTotal: monto, 
        estadoOC: 'Generada' 
    };
    return of(resumen);
  }



  getOrdenesHistoricas(): Observable<OrdenCompraResumen[]> {
    // Simulamos datos históricos:
    const mockOrdenes: OrdenCompraResumen[] = [
      { 
        idOrden: 5001, 
        idSolicitud: 1004, 
        proveedorPrincipal: 'Global Supply SRL', 
        fechaGeneracion: '2025-10-20', 
        montoTotal: 1550.00, 
        estadoOC: 'Completada' 
      },
      { 
        idOrden: 5002, 
        idSolicitud: 1005, 
        proveedorPrincipal: 'Tech Solutions Corp', 
        fechaGeneracion: '2025-10-25', 
        montoTotal: 489.99, 
        estadoOC: 'Recibida Parcial' 
      },
      { 
        idOrden: 5003, 
        idSolicitud: 1008, 
        proveedorPrincipal: 'Local Hardware', 
        fechaGeneracion: '2025-11-01', 
        montoTotal: 9200.75, 
        estadoOC: 'Generada' 
      },
      // ... más órdenes ...
    ];
    return of(mockOrdenes as OrdenCompraResumen[]);
  }
  
  getDetalleOrdenCompra(idOrden: number): Observable<OrdenCompraDetalle> {
    // Simulamos datos detallados para el ID
    const mockDetalle: OrdenCompraDetalle = {
      resumen: {
        idOrden: idOrden, 
        idSolicitud: 1001, 
        proveedorPrincipal: 'Global Supply SRL', 
        fechaGeneracion: '2025-10-20', 
        montoTotal: 1550.00, 
        estadoOC: 'Completada' 
      },
      productos: [
        { idProducto: 101, nombreProducto: 'Monitor 24"', cantidadComprada: 5, nombreProveedorFinal: 'Global Supply SRL', precioUnitarioFinal: 250.00, subtotal: 1250.00},
        { idProducto: 102, nombreProducto: 'Mouse Óptico', cantidadComprada: 10, nombreProveedorFinal: 'Global Supply SRL', precioUnitarioFinal: 30.00, subtotal: 300.00},
        
      ],
      justificacion: "Se seleccionó a Global Supply SRL debido a que ofrecieron un precio unitario inferior al promedio del mercado y garantizan la entrega en 7 días hábiles."
    };
    return of(mockDetalle);
  }
  // 💡 Implementar funciones como getProductosBySolicitudId(), saveCotizacion(), etc.
}
  
