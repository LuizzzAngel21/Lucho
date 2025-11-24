// src/app/GestionCompras/models/producto-cotizacion.model.ts

/**
 * Define la estructura de un producto dentro de una cotización.
 */
export interface ProductoCotizacion {
  idProducto: number;
  nombreProducto: string; // Incluimos el nombre para la columna 'ID PRODUCTO'
  cantidadSolicitada: number;
  
  // Datos de la Cotización (serán llenados y editables)
  idProveedorSeleccionado: number | null;
  nombreProveedorSeleccionado: string | null;
  precioUnitarioReferencial: number | null; // El precio de la cotización seleccionada
  
  // Propiedad para el cálculo
  subtotal: number | null; // Calculado como cantidadSolicitada * precioUnitarioReferencial
}