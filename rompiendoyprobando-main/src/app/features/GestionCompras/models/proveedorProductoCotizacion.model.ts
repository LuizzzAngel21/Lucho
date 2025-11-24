import { Proveedor } from "./ProveedorModels/proveedor.model";

export type ProveedorProductoCotizacion = Proveedor & {
  /**
   * Campo específico de la cotización: El precio unitario ofrecido por 
   * este proveedor para este producto.
   */
  precioReferencial: number; 
};