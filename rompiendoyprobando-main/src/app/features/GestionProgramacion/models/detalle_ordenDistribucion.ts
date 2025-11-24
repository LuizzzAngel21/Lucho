export interface DetalleOrdenDistribucion {
	id_orden_dist: string;
	id_lote: string;
	id_producto: string;
	cantidad: number;
	condiciones_transporte?: string;
	temperatura_requerida?: string;
	observaciones?: string;
	fecha_creacion?: string;
}
