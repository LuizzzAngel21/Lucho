import { Vehiculo } from "./vehiculo.model";

// --------------------------------------------------------
// MODELO - DETALLE_ORDEN_DISTRIBUCION (detalleOrdenDistribucion)
// Usado en: asignacion-vehiculo-lote-table
// --------------------------------------------------------
export interface DetalleOrdenDistribucion {
	idLote: number;
	nombreProducto: string;
	cantidadProducto: number;
	condicionTransporteRequerida: string; // Extraído del Producto para la lógica de filtro

	// Estado de asignación
	idVehiculoAsignado: number | null;
	
	// Opciones de vehículo disponibles para este lote (para el combobox)
	opcionesVehiculo: Vehiculo[];
}