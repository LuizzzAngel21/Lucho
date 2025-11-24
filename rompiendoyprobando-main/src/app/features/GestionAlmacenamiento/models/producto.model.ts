/**
 * Representa un producto (medicamento) dentro del sistema.
 */
export interface Producto {
  id_producto: number;
  nombre_producto: string;
  descripcion_producto?: string | null;
  codigo_digemid?: string | null;
  registro_sanitario?: string | null;
  id_tipo?: number | null;
  id_forma?: number | null;
  condiciones_almacenamiento?: string | null;
  condiciones_transporte?: string | null;
  estado?: string | null;
  fecha_creacion?: string | null; // ISO 8601
  fecha_actualizacion?: string | null; // ISO 8601
}
