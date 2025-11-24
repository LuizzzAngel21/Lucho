import { OrdenDistribucion } from "../ordenDistribucion.model";



export interface OrdenReporte extends OrdenDistribucion {
    // 🛑 Campo de Reporte: Indica si existen incidencias registradas
    tieneIncidencias: boolean; 
    
    // Opcional: Podríamos incluir el número total de lotes para el detalle
    totalLotes: number; 
}