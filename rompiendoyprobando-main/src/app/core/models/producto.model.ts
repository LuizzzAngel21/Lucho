export interface Producto {
  // 1. Identificación y Nombres
  id: number;
  nombreProducto: string;
  descripcionProducto?: string; // Opcional en el frontend
  
  // 2. Registros y Códigos
  codigoDigemid?: string;
  registroSanitario?: string;
  
  // 3. Tipos y Formas (Si se usan en el frontend, se incluyen los IDs o los objetos)
  // Por ahora, asumimos que solo el nombre es relevante para la visualización
  idTipo: number; 
  idForma: number; 

  // 4. Condiciones de Almacenamiento y Transporte
  condicionesAlmacenamiento?: string;
  condicionesTransporte?: string;
  
  // 5. Estado y Fechas
  estado: boolean;
  fechaCreacion?: Date | string;
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