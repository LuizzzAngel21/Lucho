export interface IncidenciaTransporteCreatePayload {
    idVehiculo: number;
    idOrdenDist: number;
    idDetalleDist?: number | null; // Opcional, si el problema es con un lote específico
    tipoIncidencia: string; 
    descripcion: string;
    impacto: 'Moderado' | 'Alto' | 'Bajo';
    idUsuarioReporta: number; // ID del usuario logueado o que reporta
}