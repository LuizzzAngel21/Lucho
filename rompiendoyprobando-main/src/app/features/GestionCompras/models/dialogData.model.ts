import { ProductoCotizacion } from "./productoCotizacion.model";
import { ProveedorProductoCotizacion } from "./proveedorProductoCotizacion.model";


export interface PopupProveedorProductoData {
  producto: ProductoCotizacion; // El producto para el que buscamos proveedores
}

export interface PopupProveedorProductoResult {
  proveedorSeleccionado: ProveedorProductoCotizacion;
}