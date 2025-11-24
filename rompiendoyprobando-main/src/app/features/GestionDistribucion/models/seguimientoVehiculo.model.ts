// --------------------------------------------------------
// MODELO - SEGUIMIENTO-VEHICULOS (seguimientoVehiculos)
// Usado en: monitoreo-vehiculos-table
// --------------------------------------------------------
export interface SeguimientoVehiculo {
	idSeguimiento: number;
	idOrden: number;
	idVehiculo: number;
	placaVehiculo: string; // Incluimos la placa para el display
	estadoActual: 'En Ruta' | 'En Entrega' | 'Cancelado' | 'Retrasado' | 'Entregada';
	ubicacionActual: string; // Coordenadas o descripción de la ubicación
	fechaHoraActualizacion: Date | string; // Instant de Java
	proximoDestino: string;
	estimadoLlegada: Date | string;
}
