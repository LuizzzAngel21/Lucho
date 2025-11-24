export interface LoteProducto {
	id_lote: string;
	id_producto: string;
	numero_lote: string;
	fecha_fabricacion: string; // dd/mm/yyyy
	fecha_vencimiento: string; // dd/mm/yyyy
	cantidad_actual: number;
	ubicacion_almacen: string;
	temperatura_almacenamiento: string;
	fecha_creacion: string; // dd/mm/yyyy
}
