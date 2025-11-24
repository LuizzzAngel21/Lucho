import { Proveedor } from "./proveedor.model";

/**
 * Datos de entrada para los Overlays de Proveedor (Creación/Edición)
 */
export interface ProveedorDialogData {
    mode: 'create' | 'edit';
    proveedor?: Proveedor; // Solo presente en modo 'edit'
}

/**
 * Resultado devuelto por el Overlay de Creación/Edición
 */
export interface ProveedorDialogResult {
    success: boolean;
    data?: Proveedor; // El proveedor creado o actualizado
}