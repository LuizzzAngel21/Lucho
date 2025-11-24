/**
 * Payload para la creación de un nuevo proveedor (ProveedorCreateDto).
 * No requiere 'id' ni 'estado' (asumido como true al crear).
 */
export interface ProveedorCreatePayload {
    nombreProveedor: string;
    ruc: string;
    direccion: string;
    telefono: string;
    correo: string;
}