// src/app/GestionCompras/models/orden-compra-detalle.model.ts

import { OrdenCompraResumen } from './ordenCompraResumen.model';
import { ResumenCompra } from './resumenCompra.model';

export interface OrdenCompraDetalle {
  resumen: OrdenCompraResumen; // Datos del header/resumen
  productos: ResumenCompra[]; // Datos de la tabla
  justificacion: string; // Justificación guardada
}