/**
 * Representa un lote de producto que se registra durante el proceso de recepción/registro de lotes.
 */
export interface LotesProducto {
  id_lote: number;
  id_producto: number;
  id_orden_compra?: number | null;
  numero_lote?: string | null;
  fecha_fabricacion?: string | null; // ISO 8601
  cantidad_inicial: number;
  cantidad_actual: number;
  estado?: string | null;
  ubicacion_almacen?: string | null;
  temperatura_almacenamiento?: number | null; // grados Celsius, si aplica
  fecha_creacion?: string | null; // ISO 8601
  fecha_actualizacion?: string | null; // ISO 8601
}
