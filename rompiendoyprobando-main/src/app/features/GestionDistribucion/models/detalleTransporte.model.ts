
// --------------------------------------------------------
// MODELO - DETALLE-TRASPORTE (detalleTrasporte)
// Usado en: vehiculo-lotes-table
// --------------------------------------------------------
export interface DetalleTransporte {
	idLote: number;
	nombreProducto: string;
	cantidadTransportada: number;

	incidenciaReportada: boolean; 
}
