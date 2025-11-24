// --------------------------------------------------------
// MODELO - LOTE (lote-producto)
// Usado en: popup-info-lote
// --------------------------------------------------------
export interface LoteProducto {
	idLote: number;
	idProducto: number;
	numeroLote: string;
	cantInicial: number;
	cantActual: number;
	fechaFabricacion: Date | string;
	fechaVencimiento: Date | string;
	estado: 'Disponible' | 'Asignado' | 'Vencido' | 'En Tránsito';
}