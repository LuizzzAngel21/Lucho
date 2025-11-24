import { OrdenReporte } from "./ordenReporte.model";
import { DetalleOrdenDistribucion } from "../detalleOrdenDistribucion.model";
import { SeguimientoVehiculo } from "../seguimientoVehiculo.model";


/**
 * Modelo COMPLETO que une todos los datos de la Orden para la vista de Detalle.
 * (Orden + Detalle Lotes + Info Monitoreo)
 */
export interface DetalleOrdenCompleta {
    orden: OrdenReporte; // Información principal de la orden
    detallesLotes: DetalleOrdenDistribucion[]; // Los lotes que se transportaron
    infoSeguimiento: SeguimientoVehiculo; // El seguimiento final de la orden
    justificacionCierre: string; // Justificación del cierre, si aplica
}