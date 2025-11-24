/**
 * Datos de entrada necesarios para inicializar el formulario de incidencia.
 */
export interface IncidenciaDialogData {
    idVehiculo: number; // Clave: para saber qué vehículo reportar
    idOrdenDist: number; // Clave: para saber a qué orden pertenece
    idUsuarioReporta: number; // Clave: quién reporta
    // Opcional: si la incidencia se reporta desde la vista de lotes
    idDetalleDist?: number | null; 
    lotesDisponibles: number[]; 
}

export interface IncidenciaDialogResult {
    success: boolean;
}