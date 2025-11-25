// --------------------------------------------------------
// MODELO - VEHICULO
// Usado en: combobox de asignacion-vehiculo-lote-table
// --------------------------------------------------------
export interface Vehiculo {
	id: number;
	placa: string;
	marca?: string;
	modelo?: string;
	tipoVehiculo?: string;
	estado?: string;
	// capacidad and condicionTransporte removed as they are not in VehiculoDto
	// Keeping them as optional if frontend logic relies on them, but they won't come from backend directly
	capacidad?: number;
	condicionTransporte?: string;
	disponible?: boolean;
}
