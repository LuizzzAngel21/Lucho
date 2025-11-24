// --------------------------------------------------------
// MODELO - ORDEN_DISTRIBUCION (ordenDistribucion)
// Usado en: ordenes-distribucion-table
// --------------------------------------------------------
export interface OrdenDistribucion {
	idOrden: number;
	idRequerimiento: number;
	nombreUsuario: string;
	area: string;
	estado: 'Pendiente' | 'Programada' | 'En ruta' | 'Entregada' | 'Cancelada';
	prioridad: 'Alta' | 'Media' | 'Baja';
	fechaEntregaEstimada: Date | string;
}