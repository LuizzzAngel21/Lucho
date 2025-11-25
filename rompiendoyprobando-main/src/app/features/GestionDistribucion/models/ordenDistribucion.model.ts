// --------------------------------------------------------
// MODELO - ORDEN_DISTRIBUCION (ordenDistribucion)
// Usado en: ordenes-distribucion-table
// --------------------------------------------------------
export interface OrdenDistribucion {
	id: number;
	fechaDistribucion: string;
	idRequerimiento: number;
	estado: string;
	prioridad: string;
	// Additional fields used by components for filtering/display
	nombreUsuario?: string;
	area?: string;
	// fechaEntregaEstimada not in DTO, might need to be removed or kept if calculated
}