// src/app/GestionCompras/models/resumen-compra.model.ts

/**
 * Define la estructura de un ítem en el resumen o detalle final de la compra/orden.
 */
export interface ResumenCompra {
  idProducto: number;
  nombreProducto: string;
  cantidadComprada: number;
  
  // Datos finales de la compra
  nombreProveedorFinal: string;
  precioUnitarioFinal: number;
  subtotal: number; // Cantidad * Precio Unitario
  
  // Posiblemente información de la solicitud original
}