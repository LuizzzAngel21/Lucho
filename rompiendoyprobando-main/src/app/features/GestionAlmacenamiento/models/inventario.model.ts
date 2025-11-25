/**
 * Representa un registro de inventario: un lote_producto que ya forma parte de un almacén.
 */
export interface Inventario {
  id: number;
  idAlmacen: { nombreAlmacen: string };
  idLote: { id: number; numeroLote: string; fechaVencimiento: string };
  stockActual: number;
  stockMinimo?: number;
  ubicacionEspecifica?: string;
  // Backend DTO doesn't have these, but keeping if needed for UI logic (might be null)
  stockMaximo?: number;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}
