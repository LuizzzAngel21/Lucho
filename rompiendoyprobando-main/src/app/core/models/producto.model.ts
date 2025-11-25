export interface Producto {
  // 1. Identificación y Nombres
  id: number;
  nombreProducto: string;
  descripcionProducto?: string;

  // 2. Registros y Códigos
  codigoDigemid?: string;
  registroSanitario?: string;

  // 3. Tipos y Formas
  // Backend returns full objects, but we might only need IDs or names for display
  idTipo?: any; // Changed to any or specific interface if available to handle object response
  idForma?: any; // Changed to any or specific interface if available

  // 4. Condiciones de Almacenamiento y Transporte
  condicionesAlmacenamiento?: string;
  condicionesTransporte?: string;

  // 5. Estado y Fechas
  estado: boolean;
  fechaCreacion?: string; // Backend sends ISO string
  fechaActualizacion?: string;
}


/**
 * Estructura de un ítem de producto dentro de la Solicitud de Compra.
 * Combina la información de Producto con los datos específicos de la solicitud.
 */
export interface ProductoCotizacion {
  // Datos del Producto
  idProducto: number;
  nombreProducto: string; // Usamos este para la visualización
  cantidadSolicitada: number;

  // Datos de la Cotización
  idProveedorSeleccionado: number | null;
  nombreProveedorSeleccionado: string | null;
  precioUnitarioReferencial: number | null;
  subtotal: number | null;
}