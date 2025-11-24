/**
 * Modelo de datos principal (DTO de Lectura) para la tabla y listados.
 */
export interface Proveedor {
    id: number;
    nombreProveedor: string;
    ruc: string;
    direccion: string;
    telefono: string;
    correo: string;
    estado: boolean; // true = Activo, false = Inactivo
}