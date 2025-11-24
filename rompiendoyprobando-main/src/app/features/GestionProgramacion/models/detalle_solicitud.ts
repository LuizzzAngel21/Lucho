export interface DetalleSolicitud {
  id_solicitud: string;
  id_producto: string;
  cantidad: number;
  observacion?: string;
  fecha_creacion?: string;
  fecha_actual?: string;
}
