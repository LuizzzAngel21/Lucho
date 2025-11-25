// src/app/GestionCompras/models/orden-compra-resumen.model.ts

/**
 * Define la estructura para el listado de Órdenes de Compra (OC).
 */
export interface OrdenCompraResumen {
  idOrden: number;
  idSolicitud: any; // Backend returns SolicitudCompra object
  proveedorPrincipal: string; // This might need mapping if backend doesn't provide it directly in the summary
  fechaGeneracion: string;
  montoTotal: number;
  estadoOC: string; // Align with backend strings (Pendiente, etc.)
}