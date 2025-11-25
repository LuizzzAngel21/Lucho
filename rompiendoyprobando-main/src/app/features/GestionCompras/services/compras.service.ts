import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductoCotizacion } from '../models/productoCotizacion.model';
import { SolicitudCompra } from '../models/solicitudCompra.model';
import { ProveedorProductoCotizacion } from '../models/proveedorProductoCotizacion.model';
import { OrdenCompraResumen } from '../models/ordenCompraResumen.model';
import { OrdenCompraDetalle } from '../models/ordenCompraDetalle.model';
import { ProveedorService } from './proveedor.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private apiUrl = `${environment.apiUrl}/api/compras`;

  constructor(private http: HttpClient, private proveedorService: ProveedorService) { }

  /**
   * Obtiene la lista de solicitudes de compra pendientes.
   */
  getSolicitudesPendientes(): Observable<SolicitudCompra[]> {
    return this.http.get<any>(`${this.apiUrl}/solicitudes?estado=PENDIENTE`).pipe(
      map(response => response.data)
    );
  }

  /**
   * Obtiene los productos específicos de una solicitud listos para ser cotizados.
   */
  getProductosBySolicitudId(idSolicitud: number): Observable<ProductoCotizacion[]> {
    return this.http.get<any>(`${this.apiUrl}/solicitudes/${idSolicitud}/detalles`).pipe(
      map(response => response.data.map((detalle: any) => ({
        idProducto: detalle.idProducto.id,
        nombreProducto: detalle.idProducto.nombreProducto,
        cantidadSolicitada: detalle.cantidad,
        idProveedorSeleccionado: null,
        nombreProveedorSeleccionado: null,
        precioUnitarioReferencial: null,
        subtotal: null
      })))
    );
  }

  /**
   * Obtiene los proveedores disponibles para un ID de producto específico.
   */
  getProveedoresByProductoId(productoId: number): Observable<ProveedorProductoCotizacion[]> {
    return this.http.get<any>(`${this.apiUrl}/productos/${productoId}/cotizaciones`).pipe(
      map(response => response.data.map((cot: any) => ({
        id: cot.idProveedor.id,
        nombreProveedor: cot.idProveedor.nombreProveedor,
        ruc: cot.idProveedor.ruc,
        direccion: cot.idProveedor.direccion,
        telefono: cot.idProveedor.telefono,
        correo: cot.idProveedor.correo,
        estado: cot.idProveedor.estado,
        precioReferencial: cot.precioUnitario
      })))
    );
  }

  /**
   * Confirma la cotización y genera la Orden de Compra (OC).
   */
  confirmarCotizacion(
    idSolicitud: number,
    productos: ProductoCotizacion[],
    justificacion: string
  ): Observable<OrdenCompraResumen> {
    const ordenCompraDto = {
      idSolicitud: idSolicitud,
      detalles: productos.map(p => ({
        idProducto: p.idProducto,
        cantidad: p.cantidadSolicitada,
        precioUnitario: p.precioUnitarioReferencial,
        idProveedor: p.idProveedorSeleccionado
      })),
      observaciones: justificacion
    };

    return this.http.post<any>(`${this.apiUrl}/ordenes-compra`, ordenCompraDto).pipe(
      map(response => ({
        idOrden: response.idOrdenCompra,
        idSolicitud: idSolicitud,
        proveedorPrincipal: 'Múltiples', // Backend logic determines this
        fechaGeneracion: new Date().toISOString(),
        montoTotal: 0, // Backend calculates this
        estadoOC: 'GENERADA'
      }))
    );
  }

  getOrdenesHistoricas(): Observable<OrdenCompraResumen[]> {
    // No direct endpoint for historical orders in ComprasController yet.
    // Returning empty for now.
    return of([]);
  }

  getDetalleOrdenCompra(idOrden: number): Observable<OrdenCompraDetalle> {
    // No direct endpoint for order details in ComprasController yet.
    // Returning empty/mock for now to avoid breaking UI if called.
    return of({} as OrdenCompraDetalle);
  }
}

