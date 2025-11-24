
import { DetalleOrdenDistribucion } from "./detalleOrdenDistribucion.model";
// --------------------------------------------------------
// MODELO - DIALOG DATA (para el Overlay)
// --------------------------------------------------------
export interface SelectorVehiculoDialogData {
    idOrden: number; // ID de la orden que se está modificando
}

// Interfaz para la data de entrada
export interface InfoVehiculoDialogData {
    idVehiculo: number;
}

export interface SelectorVehiculoDialogResult {
    success: boolean;
    detallesActualizados?: DetalleOrdenDistribucion[];
}