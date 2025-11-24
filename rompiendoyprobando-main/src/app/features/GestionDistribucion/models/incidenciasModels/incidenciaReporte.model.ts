// --------------------------------------------------------
// MODELO - INCIDENCIA (IncidenciaReporte)
// Usado en: incidencias-reporte (la tabla)
// --------------------------------------------------------
export interface IncidenciaReporte {
    idIncidencia: number;
    idOrden: number;
    idVehiculo: number;
    idDetalleDist: number | null; // Lote afectado (null si es general)
    tipoIncidencia: string;
    descripcion: string;
    impacto: 'Bajo' | 'Moderado' | 'Alto';
    fechaReporte: Date | string;
    usuarioReporta: string;
}
