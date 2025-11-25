// src/app/GestionCompras/models/solicitud-compra.model.ts
export interface SolicitudCompra {
  id: number;
  area?: string; // Not in DTO
  solicitante?: string; // Not in DTO
  fechaSolicitud: Date | string;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada' | 'En Cotización';
  motivo?: string; // Not in DTO
  idRequerimientoId?: number; // In DTO
}