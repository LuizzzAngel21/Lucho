/**
 * Payload para la actualización de un proveedor existente (ProveedorUpdateDto).
 * No requiere 'ruc' (ya que no se modifica).
 */
export interface ProveedorUpdatePayload {
    nombreProveedor: string;
    direccion: string;
    telefono: string;
    correo: string;
    estado: boolean;
}