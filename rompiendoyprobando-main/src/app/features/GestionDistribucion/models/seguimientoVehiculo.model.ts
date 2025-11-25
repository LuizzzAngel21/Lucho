// --------------------------------------------------------
// MODELO - SEGUIMIENTO-VEHICULOS (seguimientoVehiculos)
// Usado en: monitoreo-vehiculos-table
// --------------------------------------------------------
export interface SeguimientoVehiculo {
	id: number;
	idVehiculo: { id: number; placa: string };
	idOrdenDistId: number; // Note: DTO has idOrdenDistId
	estadoActual: string;
	ubicacionActual: string;
	fechaHoraActualizacion: string;
	proximoDestino: string;
	// Additional computed/convenience properties for components
	idSeguimiento?: number; // Alias for id
	placaVehiculo?: string; // Derived from idVehiculo.placa
	idOrden?: number; // Alias for idOrdenDistId
	// estimadoLlegada not in DTO
}
