export interface Producto {
	id_producto: string;
	nombre_producto: string;
	descripcion_producto: string;
	cantidadsolicitada: number;
	codigo_digemid: string;
	registro_sanitario: string;
	id_tipo: string;
	id_forma: string;
	estado: string; // Ej: 'pendiente' | 'procesado'
}
