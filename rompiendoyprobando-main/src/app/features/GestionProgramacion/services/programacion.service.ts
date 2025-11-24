import { Injectable } from '@angular/core';
import { DetalleRequerimiento } from '../models/detalle_requerimiento';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoteProducto } from '../models/lotes_producto.model';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetalleOrdenDistribucion } from '../models/detalle_ordenDistribucion';
import { DetalleSolicitud } from '../models/detalle_solicitud';
import { Producto } from '../models/producto.model';
// Entidades de dominio
export interface Requerimiento {
  id_req: string;
  id_usr: string;
  id_dep: string;
  fecha: string; // dd/mm/yyyy
  descripcion: string;
  prioridad: 'ALTA' | 'MEDIA' | 'BAJA';
  status_req: 'pendiente' | 'atendido' | 'cancelado';
  productos: ProductoRequerido[];
}

export interface RequerimientoPendiente extends Requerimiento {
  status_req: 'pendiente';
}

export interface RequerimientoAtendido extends Requerimiento {
  status_req: 'atendido' | 'cancelado';
}

export interface ProductoRequerido {
  id_producto: string;
  nombre: string;
  cantidad: number;
  proveedorSeleccionado?: string; // id del proveedor/punto de venta
}

export interface StockPuntoVenta {
  id_puntoVenta: string;
  nombre_puntoventa: string;
  id_producto: string;
  nombre_producto: string;
  stock_prod: number;
}

// DTOs para las tablas (coinciden con las columnas de los templates)
export interface RequerimientoRow {
  id_req: string;
  id_usr: string;
  id_dep: string;
  fecha_emision: string;
  descripcion: string;
  prioridad: string;
  estado: string;
}

export interface ProductoSolicitadoRow {
  id_prod: string;
  nombre: string;
  cantidad: number;
  proveedor_seleccionado?: string;
}

export interface PuntoVentaProductoRow {
  id_puntoVenta: string;
  nombre_puntoVenta: string;
  id_producto: string;
  nombre_producto: string;
  stock_producto: number;
}

@Injectable({ providedIn: 'root' })
export class ProgramacionService {
  private readonly requerimientosSubject = new BehaviorSubject<Requerimiento[]>([
    {
      id_req: 'REQ01',
      id_usr: 'U001',
      id_dep: 'D001',
      fecha: '20/10/2024',
      descripcion: 'Necesito 50 unidades',
      prioridad: 'ALTA',
      status_req: 'pendiente',
      productos: [
        { id_producto: 'P001', nombre: 'Aspirina', cantidad: 150 },
        { id_producto: 'P002', nombre: 'Paracetamol', cantidad: 80 },
      ],
    },
    {
      id_req: 'REQ02',
      id_usr: 'U002',
      id_dep: 'D002',
      fecha: '22/10/2024',
      descripcion: 'Requerimiento de prueba',
      prioridad: 'MEDIA',
      status_req: 'atendido',
      productos: [
        { id_producto: 'P003', nombre: 'Ibuprofeno', cantidad: 60 },
      ],
    },
  ]);

    // -------- Productos para atender requerimiento (vista detalle-requerimiento-atender) --------
    private productosAtenderSubject = new BehaviorSubject<Producto[]>([]);

    // Mock lotes por producto para popup revisar stock
    private lotesMock: LoteProducto[] = [
      {
        id_lote: 'L001', id_producto: 'P001', numero_lote: 'NL-001',
        fecha_fabricacion: '01/09/2024', fecha_vencimiento: '01/09/2025', cantidad_actual: 120,
        ubicacion_almacen: 'Almacén Central A1', temperatura_almacenamiento: '4C', fecha_creacion: '02/09/2024'
      },
      {
        id_lote: 'L002', id_producto: 'P001', numero_lote: 'NL-002',
        fecha_fabricacion: '15/09/2024', fecha_vencimiento: '15/09/2025', cantidad_actual: 60,
        ubicacion_almacen: 'Almacén Secundario B3', temperatura_almacenamiento: '4C', fecha_creacion: '16/09/2024'
      },
      {
        id_lote: 'L010', id_producto: 'P002', numero_lote: 'PAR-10',
        fecha_fabricacion: '05/08/2024', fecha_vencimiento: '05/08/2026', cantidad_actual: 200,
        ubicacion_almacen: 'Almacén Central C2', temperatura_almacenamiento: 'Ambiente', fecha_creacion: '06/08/2024'
      },
      {
        id_lote: 'L020', id_producto: 'P003', numero_lote: 'IBU-20',
        fecha_fabricacion: '21/07/2024', fecha_vencimiento: '21/07/2026', cantidad_actual: 40,
        ubicacion_almacen: 'Almacén Frío D5', temperatura_almacenamiento: '2C', fecha_creacion: '22/07/2024'
      }
    ];

    loadProductosParaAtender(idReq: string) {
      const req = this.requerimientosSubject.value.find(r => r.id_req === idReq);
      if (!req) {
        this.productosAtenderSubject.next([]);
        return;
      }
      // Mapear productos requeridos a modelo Producto con datos mock adicionales
      const mapped: Producto[] = req.productos.map(p => ({
        id_producto: p.id_producto,
        nombre_producto: p.nombre,
        descripcion_producto: `Descripción de ${p.nombre}`,
        cantidadsolicitada: p.cantidad,
        codigo_digemid: 'DIG-' + p.id_producto,
        registro_sanitario: 'REG-' + p.id_producto,
        id_tipo: 'TIPO1',
        id_forma: 'FORMA1',
        estado: 'pendiente'
      }));
      this.productosAtenderSubject.next(mapped);
    }

    getProductosParaAtender(): Observable<Producto[]> {
      return this.productosAtenderSubject.asObservable();
    }

    getLotesByProducto(idProducto: string): Observable<LoteProducto[]> {
      return of(this.lotesMock.filter(l => l.id_producto === idProducto));
    }

  readonly requerimientos$ = this.requerimientosSubject.asObservable();

  // Mock DetalleRequerimientos (pendientes) para la nueva tabla basada en DetalleRequerimiento
  private readonly detallePendientesSubject = new BehaviorSubject<DetalleRequerimiento[]>([
    {
      id_requerimiento: 'REQ01',
      id_producto: 'P001',
      cantidad: 150,
      observacion: 'Urgente para distribución',
      fecha_creacion: '20/10/2024',
      fecha_actual: '21/10/2024'
    },
    {
      id_requerimiento: 'REQ01',
      id_producto: 'P002',
      cantidad: 80,
      observacion: 'Validar stock en PV',
      fecha_creacion: '20/10/2024',
      fecha_actual: '21/10/2024'
    },
    {
      id_requerimiento: 'REQ03',
      id_producto: 'P005',
      cantidad: 40,
      observacion: 'Nuevo requerimiento',
      fecha_creacion: '23/10/2024',
      fecha_actual: '23/10/2024'
    }
  ]);

  getDetalleRequerimientosPendientes(): Observable<DetalleRequerimiento[]> {
    return this.detallePendientesSubject.asObservable();
  }

  // ---------------- Orden Distribución & Solicitud Compra (Atendidos) ----------------
  private readonly ordenDistribucionSubject = new BehaviorSubject<DetalleOrdenDistribucion[]>([
    {
      id_orden_dist: 'OD001',
      id_lote: 'L001',
      id_producto: 'P001',
      cantidad: 120,
      condiciones_transporte: 'Frío',
      temperatura_requerida: '4C',
      observaciones: 'Revisar embalaje',
      fecha_creacion: '18/10/2024'
    },
    {
      id_orden_dist: 'OD001',
      id_lote: 'L002',
      id_producto: 'P002',
      cantidad: 60,
      condiciones_transporte: 'Seco',
      temperatura_requerida: 'Ambiente',
      observaciones: 'Urgente',
      fecha_creacion: '18/10/2024'
    },
    {
      id_orden_dist: 'OD002',
      id_lote: 'L003',
      id_producto: 'P003',
      cantidad: 40,
      condiciones_transporte: 'Frío',
      temperatura_requerida: '2C',
      observaciones: 'Sensibles',
      fecha_creacion: '19/10/2024'
    }
  ]);

  private readonly solicitudCompraSubject = new BehaviorSubject<DetalleSolicitud[]>([
    {
      id_solicitud: 'SC001',
      id_producto: 'P010',
      cantidad: 300,
      observacion: 'Nuevo stock',
      fecha_creacion: '20/10/2024',
      fecha_actual: '21/10/2024'
    },
    {
      id_solicitud: 'SC001',
      id_producto: 'P011',
      cantidad: 150,
      observacion: 'Reponer baja rotación',
      fecha_creacion: '20/10/2024',
      fecha_actual: '21/10/2024'
    },
    {
      id_solicitud: 'SC002',
      id_producto: 'P012',
      cantidad: 50,
      observacion: 'Prueba piloto',
      fecha_creacion: '22/10/2024',
      fecha_actual: '22/10/2024'
    }
  ]);

  getOrdenDistribucion(): Observable<DetalleOrdenDistribucion[]> {
    return this.ordenDistribucionSubject.asObservable();
  }
  getSolicitudCompra(): Observable<DetalleSolicitud[]> {
    return this.solicitudCompraSubject.asObservable();
  }
  getOrdenDistribucionById(id: string): DetalleOrdenDistribucion[] {
    return this.ordenDistribucionSubject.value.filter(o => o.id_orden_dist === id);
  }
  getSolicitudCompraById(id: string): DetalleSolicitud[] {
    return this.solicitudCompraSubject.value.filter(s => s.id_solicitud === id);
  }

  // Accesores base
  getRequerimientos(): Requerimiento[] {
    return this.requerimientosSubject.value;
  }

  getRequerimientoById(id: string): Requerimiento | undefined {
    return this.getRequerimientos().find((r) => r.id_req === id);
  }

  // Marca el proveedor seleccionado para un producto específico en un requerimiento
  markProductoProveedor(idReq: string, idProducto: string, proveedorId: string) {
    const reqs = this.getRequerimientos().map((r) => {
      if (r.id_req !== idReq) return r;
      return {
        ...r,
        productos: r.productos.map((p) =>
          p.id_producto === idProducto ? { ...p, proveedorSeleccionado: proveedorId } : p
        ),
      };
    });
    this.requerimientosSubject.next(reqs);
  }

  // Verifica si todos los productos de un requerimiento tienen proveedor seleccionado
  areAllProductosSelected(idReq: string): boolean {
    const r = this.getRequerimientoById(idReq);
    if (!r) return false;
    return r.productos.every((p) => !!p.proveedorSeleccionado);
  }

  // Finaliza un requerimiento: aceptar -> atendido, cancelar -> cancelado
  finalizeRequerimiento(idReq: string, accion: 'cancelar' | 'aceptar') {
    const reqs = this.getRequerimientos().map((r) => {
      if (r.id_req !== idReq) return r;
      const status: Requerimiento['status_req'] = accion === 'aceptar' ? 'atendido' : 'cancelado';
      return { ...r, status_req: status };
    });
    this.requerimientosSubject.next(reqs);
  }

  // Mock de stock por producto (dominio)
  getStockByProducto(productoId: string): StockPuntoVenta[] {
    const nombre =
      productoId === 'P001' ? 'Aspirina' : productoId === 'P002' ? 'Paracetamol' : productoId === 'P003' ? 'Ibuprofeno' : 'Producto';
    return [
      { id_puntoVenta: 'PV_001', nombre_puntoventa: 'PuntoVenta_A', id_producto: productoId, nombre_producto: nombre, stock_prod: 120 },
      { id_puntoVenta: 'PV_002', nombre_puntoventa: 'PuntoVenta_B', id_producto: productoId, nombre_producto: nombre, stock_prod: 60 },
      { id_puntoVenta: 'PV_003', nombre_puntoventa: 'PuntoVenta_C', id_producto: productoId, nombre_producto: nombre, stock_prod: 200 },
    ];
  }

  // --------- Vistas: Listas de Requerimientos (Tablas) ---------
  getRequerimientosPendientes(): Observable<RequerimientoPendiente[]> {
    return this.requerimientos$.pipe(
      map((rs) => rs.filter((r): r is RequerimientoPendiente => r.status_req === 'pendiente'))
    );
  }

  getRequerimientosAtendidos(): Observable<RequerimientoAtendido[]> {
    return this.requerimientos$.pipe(
      map((rs) => rs.filter((r): r is RequerimientoAtendido => r.status_req !== 'pendiente'))
    );
  }

  // Formato exactamente como lo esperan las tablas de requerimientos (columnas fecha_emision y estado)
  getRequerimientosPendientesTabla(): Observable<RequerimientoRow[]> {
    return this.getRequerimientosPendientes().pipe(map(this.mapRequerimientosToRows));
  }

  getRequerimientosAtendidosTabla(): Observable<RequerimientoRow[]> {
    return this.getRequerimientosAtendidos().pipe(map(this.mapRequerimientosToRows));
  }

  private mapRequerimientosToRows(rs: Requerimiento[]): RequerimientoRow[] {
    return rs.map((r) => ({
      id_req: r.id_req,
      id_usr: r.id_usr,
      id_dep: r.id_dep,
      fecha_emision: r.fecha,
      descripcion: r.descripcion,
      prioridad: r.prioridad,
      estado: r.status_req,
    }));
  }

  // --------- Vista: Disponibilidad de Producto (Productos solicitados) ---------
  // Productos de un requerimiento en formato de tabla
  getProductosSolicitadosTabla(idReq: string): Observable<ProductoSolicitadoRow[]> {
    return this.requerimientos$.pipe(
      map((rs) => rs.find((r) => r.id_req === idReq)),
      map((r) =>
        (r?.productos ?? []).map((p) => ({
          id_prod: p.id_producto,
          nombre: p.nombre,
          cantidad: p.cantidad,
          proveedor_seleccionado: p.proveedorSeleccionado,
        }))
      )
    );
  }

  // Seleccionar proveedor para un producto (actualiza dominio)
  seleccionarProveedorParaProducto(idReq: string, idProducto: string, proveedorId: string) {
    this.markProductoProveedor(idReq, idProducto, proveedorId);
  }

  // Cuando todos los productos tienen proveedor, se puede aceptar
  puedeAceptar(idReq: string): Observable<boolean> {
    return this.requerimientos$.pipe(map(() => this.areAllProductosSelected(idReq)));
  }

  aceptarRequerimiento(idReq: string) {
    if (!this.areAllProductosSelected(idReq)) return;
    this.finalizeRequerimiento(idReq, 'aceptar');
  }

  cancelarRequerimiento(idReq: string) {
    this.finalizeRequerimiento(idReq, 'cancelar');
  }

  // --------- Popup: Proveedores disponibles para un producto ---------
  getProveedoresDisponiblesTabla(idProducto: string): Observable<PuntoVentaProductoRow[]> {
    return new BehaviorSubject(this.getStockByProducto(idProducto).map((s) => ({
      id_puntoVenta: s.id_puntoVenta,
      nombre_puntoVenta: s.nombre_puntoventa,
      id_producto: s.id_producto,
      nombre_producto: s.nombre_producto,
      stock_producto: s.stock_prod,
    }))).asObservable();
  }

  // Método auxiliar solicitado por un componente existente (si lo usa)
  getDisponibilidadProducto(): Observable<RequerimientoPendiente[]> {
    // Devuelve pendientes; si se necesita por ID, usar getProductosSolicitadosTabla(idReq)
    return this.getRequerimientosPendientes();
  }
}