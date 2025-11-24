// --------------------------------------------------------
// MODELO - VEHICULO
// Usado en: combobox de asignacion-vehiculo-lote-table
// --------------------------------------------------------
export interface Vehiculo {
	idVehiculo: number;
	placa: string;
	capacidad: number; // Ej: en toneladas o metros cúbicos
	tipoVehiculo: string; // Ej: Furgón, Camioneta, Refrigerado
	condicionTransporte: string; // Ej: Ambiente, Frío (Debe hacer match con Producto.condicionesTransporte)
	disponible: boolean; // Si puede ser asignado
}
