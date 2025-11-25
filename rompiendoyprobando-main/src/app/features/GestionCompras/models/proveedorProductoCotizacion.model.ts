import { Proveedor } from "./ProveedorModels/proveedor.model";

export type ProveedorProductoCotizacion = Proveedor & {
  /**
   * Campo específico de la cotización: El precio unitario ofrecido por 
   * este proveedor para este producto.
   */
  precioReferencial: number;

  /**
   * ID de la relación Producto-Proveedor (tabla producto_proveedor).
   * Necesario para actualizar la cotización.
   */
  idProductoProveedor?: number;
};