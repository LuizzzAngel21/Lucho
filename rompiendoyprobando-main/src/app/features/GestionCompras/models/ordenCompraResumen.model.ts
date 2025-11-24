// src/app/GestionCompras/models/orden-compra-resumen.model.ts

/**
 * Define la estructura para el listado de Órdenes de Compra (OC).
 */
export interface OrdenCompraResumen {
  idOrden: number;
  idSolicitud: number;
  proveedorPrincipal: string; // El proveedor que ganó la mayor parte de la OC o el proveedor clave
  fechaGeneracion: Date | string;
  montoTotal: number;
  estadoOC: 'Generada' | 'Enviada' | 'Recibida Parcial' | 'Completada' | 'Cancelada';
}