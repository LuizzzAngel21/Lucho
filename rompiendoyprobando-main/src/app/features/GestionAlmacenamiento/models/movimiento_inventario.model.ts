/**
 * Representa un movimiento o registro de cambio en el inventario.
 */
export interface MovimientoInventario {
  id_movimiento: number;
  id_inventario: number;
  tipo_movimiento: string; // e.g., 'ingreso' | 'salida' | 'ajuste'
  cantidad: number;
  fecha_movimiento: string; // ISO 8601
  id_usuario_registro: number;
  id_referencia?: number | null; // id de la orden, documento o referencia externa
  tipo_referencia?: string | null; // tipo de la referencia
  observacion?: string | null;
  fecha_creacion?: string | null; // ISO 8601
}
