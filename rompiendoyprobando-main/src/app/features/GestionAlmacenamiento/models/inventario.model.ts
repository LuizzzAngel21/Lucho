/**
 * Representa un registro de inventario: un lote_producto que ya forma parte de un almacén.
 */
export interface Inventario {
  id_inventario: number;
  id_almacen: number;
  id_lote: number;
  stock_actual: number;
  stock_minimo: number;
  stock_maximo: number;
  ubicacion_especifica?: string | null;
  fecha_creacion?: string | null; // ISO 8601
  fecha_actualizacion?: string | null; // ISO 8601
}
