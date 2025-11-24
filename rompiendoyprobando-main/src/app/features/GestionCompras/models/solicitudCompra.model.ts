// src/app/GestionCompras/models/solicitud-compra.model.ts
export interface SolicitudCompra {
  idSolicitud: number;
  area: string;
  solicitante: string;
  fechaCreacion: Date | string; 
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada' | 'En Cotización';
  motivo: string;
}