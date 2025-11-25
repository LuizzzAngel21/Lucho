import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, forkJoin } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { DetalleRequerimiento } from '../models/detalle_requerimiento';
import { LoteProducto } from '../models/lotes_producto.model';
import { DetalleOrdenDistribucion } from '../models/detalle_ordenDistribucion';
import { DetalleSolicitud } from '../models/detalle_solicitud';
import { Producto } from '../models/producto.model';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/user-services/auth.service';

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
  loteSeleccionado?: number; // ID del lote seleccionado para distribución
  idDetalleRequerimiento?: number; // ID del detalle para trazabilidad
}

export interface StockPuntoVenta {
  id_puntoVenta: string;
  nombre_puntoventa: string;
  id_producto: string;
  nombre_producto: string;
  stock_prod: number;
  id_lote?: number;
  numero_lote?: string;
  fecha_vencimiento?: string;
}

// DTOs para las tablas
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
  id_lote?: number;
  numero_lote?: string;
  fecha_vencimiento?: string;
}

@Injectable({ providedIn: 'root' })
export class ProgramacionService {
  private apiUrl = `${environment.apiUrl}/api/programacion`;

  private requerimientosSubject = new BehaviorSubject<Requerimiento[]>([]);
  readonly requerimientos$ = this.requerimientosSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { }

  // -------- Productos para atender requerimiento --------
  private productosAtenderSubject = new BehaviorSubject<Producto[]>([]);

  loadProductosParaAtender(idReq: string) {
    this.http.get<any>(`${this.apiUrl}/requerimientos/${idReq}/detalles`).subscribe(response => {
      const detalles = response.data;
      const mapped: Producto[] = detalles.map((d: any) => ({
        id_producto: d.idProducto.id,
        nombre_producto: d.idProducto.nombreProducto,
        descripcion_producto: d.idProducto.nombreProducto, // Backend doesn't send separate description
        cantidadsolicitada: d.cantidad,
        codigo_digemid: d.idProducto.codigoDigemid || '',
        registro_sanitario: d.idProducto.registroSanitario || '',
        id_tipo: d.idProducto.idTipoNombreTipo || '',
        id_forma: d.idProducto.idFormaNombreForma || '',
        estado: 'pendiente',
        idDetalleRequerimiento: d.id // Preserve ID for traceability
      }));
      this.productosAtenderSubject.next(mapped);
    });
  }

  getProductosParaAtender(): Observable<Producto[]> {
    return this.productosAtenderSubject.asObservable();
  }

  getLotesByProducto(idProducto: string): Observable<LoteProducto[]> {
    // Map InventarioStockDto to LoteProducto
    return this.http.get<any>(`${this.apiUrl}/productos/${idProducto}/stock`).pipe(
      map(response => response.data.map((s: any) => ({
        numero_lote: s.idLote.numeroLote,
        fecha_fabricacion: '', // Not in DTO
        fecha_vencimiento: s.idLote.fechaVencimiento,
        cantidad_actual: s.stockActual,
        ubicacion_almacen: s.idAlmacen.nombreAlmacen,
        temperatura_almacenamiento: '', // Not in DTO
        fecha_creacion: '', // Not in DTO
        id_lote: s.idLote.id // Important for selection
      })))
    );
  }

  // Accesores base
  getRequerimientos(): Requerimiento[] {
    return this.requerimientosSubject.value;
  }

  getRequerimientoById(id: string): Requerimiento | undefined {
    return this.getRequerimientos().find((r) => r.id_req === id);
  }

  // --------- Vistas: Listas de Requerimientos (Tablas) ---------
  getRequerimientosPendientes(): Observable<RequerimientoPendiente[]> {
    return this.http.get<any>(`${this.apiUrl}/requerimientos/pendientes`).pipe(
      map(response => response.data.map((r: any) => ({
        id_req: r.id.toString(),
        id_usr: r.idUsuarioSolicitanteNombreUsuario || 'N/A',
        id_dep: r.idDepartamentoNombreDepartamento,
        fecha: r.fechaSolicitud,
        descripcion: r.prioridad, // Using priority as description placeholder
        prioridad: r.prioridad,
        status_req: 'pendiente',
        productos: []
      }))),
      tap(reqs => this.requerimientosSubject.next(reqs))
    );
  }

  getRequerimientosPendientesTabla(): Observable<RequerimientoRow[]> {
    return this.getRequerimientosPendientes().pipe(map(this.mapRequerimientosToRows));
  }

  // Requerimientos atendidos
  getRequerimientosAtendidos(): Observable<Requerimiento[]> {
    return this.http.get<any>(`${this.apiUrl}/requerimientos/atendidos`).pipe(
      map(response => response.data.map((r: any) => ({
        id_req: r.id.toString(),
        id_usr: r.idUsuarioSolicitanteNombreUsuario || 'N/A',
        id_dep: r.idDepartamentoNombreDepartamento,
        fecha: r.fechaSolicitud,
        descripcion: r.prioridad, // Using priority as description placeholder
        prioridad: r.prioridad,
        status_req: 'atendido',
        productos: []
      })))
    );
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

  // Aceptar Requerimiento (Dividir en Compras y Distribución)
  aceptarRequerimiento(idReq: string, productosConDecision: any[]) {
    const user = this.authService.getCurrentUser();
    const userId = user?.id || 1; // Fallback to 1 if not found

    const compras = productosConDecision.filter(p => p.decision === 'COMPRAS');
    const distribucion = productosConDecision.filter(p => p.decision === 'DISTRIBUCION');

    const requests = [];

    if (compras.length > 0) {
      const solicitudCompraDto = {
        idRequerimiento: Number(idReq),
        idUsuarioSolicitante: userId,
        motivo: 'Abastecimiento por requerimiento ' + idReq,
        detalles: compras.map(p => ({
          idProducto: Number(p.id_producto),
          idDetalleRequerimiento: p.idDetalleRequerimiento,
          cantidadSolicitada: p.cantidadsolicitada
        }))
      };

      const requestDto = {
        idRequerimiento: Number(idReq),
        tipo: 'COMPRA',
        solicitudCompra: solicitudCompraDto,
        detallesDistribucion: null
      };
      requests.push(this.http.post<any>(`${this.apiUrl}/ordenes`, requestDto));
    }

    if (distribucion.length > 0) {
      // Validar que tengan lote seleccionado
      const validDistribucion = distribucion.filter(p => !!p.loteSeleccionado);
      if (validDistribucion.length !== distribucion.length) {
        alert('Error: Productos para distribución deben tener un lote seleccionado.');
        return;
      }

      const detallesDistribucionDto = validDistribucion.map(p => ({
        idProducto: Number(p.id_producto),
        idLote: p.loteSeleccionado,
        cantidad: p.cantidadsolicitada
      }));

      const requestDto = {
        idRequerimiento: Number(idReq),
        tipo: 'DISTRIBUCION',
        solicitudCompra: null,
        detallesDistribucion: detallesDistribucionDto
      };
      requests.push(this.http.post<any>(`${this.apiUrl}/ordenes`, requestDto));
    }

    if (requests.length > 0) {
      forkJoin(requests).subscribe({
        next: (responses) => {
          console.log('Ordenes creadas:', responses);
          alert('Requerimiento procesado exitosamente.');
          // Recargar o navegar
        },
        error: (err) => {
          console.error('Error procesando requerimiento:', err);
          alert('Error al procesar: ' + (err.error?.message || err.message));
        }
      });
    }
  }


  // Cache for synchronous access
  private ordenesDistribucionCache: DetalleOrdenDistribucion[] = [];
  private solicitudesCompraCache: DetalleSolicitud[] = [];

  getOrdenDistribucion(): Observable<DetalleOrdenDistribucion[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/distribucion/ordenes?estado=PENDIENTE`).pipe(
      switchMap(response => {
        const ordenes = response.data;
        if (!ordenes || ordenes.length === 0) return of([]);

        const requests: Observable<any[]>[] = ordenes.map((o: any) =>
          this.http.get<any>(`${environment.apiUrl}/api/distribucion/ordenes/${o.id}/detalles`).pipe(
            map(res => res.data.map((d: any) => ({
              id_orden_dist: o.id.toString(),
              id_lote: d.idLote?.id?.toString() || 'N/A',
              id_producto: d.idProducto?.id?.toString() || 'N/A',
              cantidad: d.cantidad,
              condiciones_transporte: d.estadoEntrega, // Mapping estadoEntrega to this field as placeholder
              temperatura_requerida: '',
              observaciones: '',
              fecha_creacion: o.fechaDistribucion
            })))
          )
        );
        return forkJoin(requests).pipe(map((responses: any[]) => responses.flat()));
      }),
      tap(data => this.ordenesDistribucionCache = data)
    );
  }

  getSolicitudCompra(): Observable<DetalleSolicitud[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/compras/solicitudes?estado=PENDIENTE`).pipe(
      switchMap(response => {
        const solicitudes = response.data;
        if (!solicitudes || solicitudes.length === 0) return of([]);

        const requests: Observable<any[]>[] = solicitudes.map((s: any) =>
          this.http.get<any>(`${environment.apiUrl}/api/compras/solicitudes/${s.id}/detalles`).pipe(
            map(res => res.data.map((d: any) => ({
              id_solicitud: s.id.toString(),
              id_producto: d.idProducto?.id?.toString() || 'N/A',
              cantidad: d.cantidadSolicitada,
              observacion: d.estado,
              fecha_creacion: s.fechaSolicitud,
              fecha_actual: s.fechaSolicitud
            })))
          )
        );
        return forkJoin(requests).pipe(map((responses: any[]) => responses.flat()));
      }),
      tap(data => this.solicitudesCompraCache = data)
    );
  }

  // Métodos restaurados para compatibilidad
  getOrdenDistribucionById(id: string): any[] {
    return this.ordenesDistribucionCache.filter(o => o.id_orden_dist === id);
  }
  getSolicitudCompraById(id: string): any[] {
    return this.solicitudesCompraCache.filter(s => s.id_solicitud === id);
  }
}