export interface DetalleRequerimiento {
  id_requerimiento: string;
  id_producto: string;
  cantidad: number;
  observacion?: string;
  fecha_creacion?: string;
  fecha_actual?: string;
}
