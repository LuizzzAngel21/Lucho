import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LotesProducto } from '../models/lotes_producto.model';
import { Inventario } from '../models/inventario.model';
import { MovimientoInventario } from '../models/movimiento_inventario.model';
import { Producto } from '../models/producto.model';

export interface LoteRecibido {
  id_lote: string;
  id_proveedor: string;
  id_orden_comp: string;
  id_producto: string;
  cantidad: number;
  lote: string;
  fecha_caducidad: string;
}

export interface LoteAtendido extends LoteRecibido {
  fecha_registro: string;
  observaciones: string;
}

export interface LoteAlmacenado extends LoteRecibido {
  fecha_almacenamiento: string;
  ubicacion: string;
}

@Injectable({ providedIn: 'root' })
export class AlmacenamientoService {
  // Devuelve lotes recibidos (estructura simple para registro) usados aún por la página registro-lote
  getLotesRecibidos(): Observable<LoteRecibido[]> {
    const data: LoteRecibido[] = [
      {
        id_lote: 'L001',
        id_proveedor: 'PROV001',
        id_orden_comp: 'PED001',
        id_producto: 'P001',
        cantidad: 100,
        lote: 'LOTE-ABC',
        fecha_caducidad: '2025-12-31',
      },
      {
        id_lote: 'L002',
        id_proveedor: 'PROV002',
        id_orden_comp: 'PED002',
        id_producto: 'P003',
        cantidad: 50,
        lote: 'LOTE-XYZ',
        fecha_caducidad: '2026-06-30',
      },
      {
        id_lote: 'L003',
        id_proveedor: 'PROV003',
        id_orden_comp: 'PED003',
        id_producto: 'P002',
        cantidad: 200,
        lote: 'LOTE-DEF',
        fecha_caducidad: '2025-09-15',
      },
    ];
    return of(data);
  }

  getLotesAtendidos(): Observable<Inventario[]> {
    const data: Inventario[] = [
      {
        id_inventario: 1,
        id_almacen: 1,
        id_lote: 1,
        stock_actual: 100,
        stock_minimo: 10,
        stock_maximo: 200,
        ubicacion_especifica: 'Estante A1',
        fecha_creacion: '2025-08-02',
        fecha_actualizacion: null,
      },
      {
        id_inventario: 2,
        id_almacen: 1,
        id_lote: 2,
        stock_actual: 50,
        stock_minimo: 5,
        stock_maximo: 100,
        ubicacion_especifica: 'Estante B2',
        fecha_creacion: '2025-07-16',
        fecha_actualizacion: null,
      },
    ];
    return of(data);
  }

  // Nueva lista de lotes con estructura completa de LotesProducto (para páginas de visualización avanzada)
  getLotesProducto(): Observable<LotesProducto[]> {
    const data: LotesProducto[] = [
      {
        id_lote: 1,
        id_producto: 101,
        id_orden_compra: 1001,
        numero_lote: 'L-2025-001',
        fecha_fabricacion: '2025-08-01',
        cantidad_inicial: 100,
        cantidad_actual: 100,
        estado: 'RECIBIDO',
        ubicacion_almacen: 'Zona de recepción',
        temperatura_almacenamiento: null,
        fecha_creacion: '2025-08-02',
        fecha_actualizacion: null,
      },
      {
        id_lote: 2,
        id_producto: 102,
        id_orden_compra: 1002,
        numero_lote: 'L-2025-002',
        fecha_fabricacion: '2025-07-15',
        cantidad_inicial: 50,
        cantidad_actual: 50,
        estado: 'RECIBIDO',
        ubicacion_almacen: 'Zona de recepción',
        temperatura_almacenamiento: 4,
        fecha_creacion: '2025-07-16',
        fecha_actualizacion: null,
      },
    ];
    return of(data);
  }

  getLotesAlmacenados(): Observable<LoteAlmacenado[]> {
    const data: LoteAlmacenado[] = [
      {
        id_lote: 'L001',
        id_proveedor: 'PROV001',
        id_orden_comp: 'PED001',
        id_producto: 'P001',
        cantidad: 100,
        lote: 'LOTE-ABC',
        fecha_caducidad: '2026-12-31',
        fecha_almacenamiento: '2025-12-31',
        ubicacion: 'Estante A1',
      },
      {
        id_lote: 'L001',
        id_proveedor: 'PROV001',
        id_orden_comp: 'PED001',
        id_producto: 'P001',
        cantidad: 100,
        lote: 'LOTE-ABC',
        fecha_caducidad: '2026-12-31',
        fecha_almacenamiento: '2025-12-31',
        ubicacion: 'Estante A1',
      },
      {
        id_lote: 'L001',
        id_proveedor: 'PROV001',
        id_orden_comp: 'PED001',
        id_producto: 'P001',
        cantidad: 100,
        lote: 'LOTE-ABC',
        fecha_caducidad: '2026-12-31',
        fecha_almacenamiento: '2025-12-31',
        ubicacion: 'Estante A1',
      },
      {
        id_lote: 'L001',
        id_proveedor: 'PROV001',
        id_orden_comp: 'PED001',
        id_producto: 'P001',
        cantidad: 100,
        lote: 'LOTE-ABC',
        fecha_caducidad: '2026-12-31',
        fecha_almacenamiento: '2025-12-31',
        ubicacion: 'Estante A1',
      },
      {
        id_lote: 'L001',
        id_proveedor: 'PROV001',
        id_orden_comp: 'PED001',
        id_producto: 'P001',
        cantidad: 100,
        lote: 'LOTE-ABC',
        fecha_caducidad: '2026-12-31',
        fecha_almacenamiento: '2025-12-31',
        ubicacion: 'Estante A1',
      },
      {
        id_lote: 'L001',
        id_proveedor: 'PROV001',
        id_orden_comp: 'PED001',
        id_producto: 'P001',
        cantidad: 100,
        lote: 'LOTE-ABC',
        fecha_caducidad: '2026-12-31',
        fecha_almacenamiento: '2025-12-31',
        ubicacion: 'Estante A1',
      },
    ];
    return of(data);
  }

  // (Duplicado eliminado) getLotesProducto ya definido arriba.

  /**
   * Devuelve el inventario (lotes ya almacenados dentro de un almacén).
   */
  getInventario(): Observable<Inventario[]> {
    const data: Inventario[] = [
      {
        id_inventario: 1,
        id_almacen: 1,
        id_lote: 1,
        stock_actual: 100,
        stock_minimo: 10,
        stock_maximo: 200,
        ubicacion_especifica: 'Estante A1',
        fecha_creacion: '2025-08-02',
        fecha_actualizacion: null,
      },
      {
        id_inventario: 2,
        id_almacen: 1,
        id_lote: 2,
        stock_actual: 50,
        stock_minimo: 5,
        stock_maximo: 100,
        ubicacion_especifica: 'Estante B2',
        fecha_creacion: '2025-07-16',
        fecha_actualizacion: null,
      },
    ];
    return of(data);
  }

  /**
   * Movimientos de inventario (registros de ingreso/salida/ajuste) para auditoría/detalle.
   */
  getMovimientosInventario(): Observable<MovimientoInventario[]> {
    const data: MovimientoInventario[] = [
      {
        id_movimiento: 1,
        id_inventario: 1,
        tipo_movimiento: 'ingreso',
        cantidad: 100,
        fecha_movimiento: '2025-08-02T10:00:00Z',
        id_usuario_registro: 42,
        id_referencia: 1001,
        tipo_referencia: 'orden_compra',
        observacion: 'Registro inicial de lote',
        fecha_creacion: '2025-08-02T10:00:00Z',
      },
      {
        id_movimiento: 2,
        id_inventario: 2,
        tipo_movimiento: 'ingreso',
        cantidad: 50,
        fecha_movimiento: '2025-07-16T09:30:00Z',
        id_usuario_registro: 43,
        id_referencia: 1002,
        tipo_referencia: 'orden_compra',
        observacion: 'Registro inicial de lote refrigerado',
        fecha_creacion: '2025-07-16T09:30:00Z',
      },
    ];
    return of(data);
  }

  /**
   * Productos asociados a inventario por id_inventario (mock). Se asume relación inventario -> lote -> productos.
   */
  private productosMock: { lote: number; inventario: number; productos: Producto[] }[] = [
    {
      lote: 1,
      inventario: 1,
      productos: [
        {
          id_producto: 101,
          nombre_producto: 'Aspirina 500mg',
          descripcion_producto: 'Analgesico',
          codigo_digemid: 'DIG001',
          registro_sanitario: 'RS-123',
          id_tipo: 1,
          id_forma: 1,
          condiciones_almacenamiento: 'Seco',
          condiciones_transporte: 'Ambiental',
          estado: 'ACTIVO',
          fecha_creacion: '2025-08-02',
          fecha_actualizacion: null,
        },
        {
          id_producto: 102,
          nombre_producto: 'Ibuprofeno 400mg',
          descripcion_producto: 'Antiinflamatorio',
          codigo_digemid: 'DIG002',
          registro_sanitario: 'RS-456',
          id_tipo: 1,
          id_forma: 1,
          condiciones_almacenamiento: 'Seco',
          condiciones_transporte: 'Ambiental',
          estado: 'ACTIVO',
          fecha_creacion: '2025-08-02',
          fecha_actualizacion: null,
        },
      ],
    },
    {
      lote: 2,
      inventario: 2,
      productos: [
        {
          id_producto: 103,
          nombre_producto: 'Paracetamol 500mg',
          descripcion_producto: 'Antipirético',
          codigo_digemid: 'DIG003',
          registro_sanitario: 'RS-789',
          id_tipo: 1,
          id_forma: 1,
          condiciones_almacenamiento: 'Seco',
          condiciones_transporte: 'Ambiental',
          estado: 'ACTIVO',
          fecha_creacion: '2025-07-16',
          fecha_actualizacion: null,
        },
      ],
    },
  ];

  getProductosPorInventarioOIdLote(codigo: string): Observable<Producto[]> {
    const numeric = Number(codigo);
    if (!codigo || isNaN(numeric)) {
      return of([]);
    }
    const entry = this.productosMock.find((p) => p.inventario === numeric || p.lote === numeric);
    return of(entry ? entry.productos : []);
  }

  /** Catálogo mock de productos para búsqueda directa por código DIGEMID */
  private productosCatalogo: Producto[] = [
    {
      id_producto: 101,
      nombre_producto: 'Aspirina 500mg',
      descripcion_producto: 'Analgesico',
      codigo_digemid: 'DIG001',
      registro_sanitario: 'RS-123',
      id_tipo: 1,
      id_forma: 1,
      condiciones_almacenamiento: 'Seco',
      condiciones_transporte: 'Ambiental',
      estado: 'ACTIVO',
      fecha_creacion: '2025-08-02',
      fecha_actualizacion: null,
    },
    {
      id_producto: 102,
      nombre_producto: 'Ibuprofeno 400mg',
      descripcion_producto: 'Antiinflamatorio',
      codigo_digemid: 'DIG002',
      registro_sanitario: 'RS-456',
      id_tipo: 1,
      id_forma: 1,
      condiciones_almacenamiento: 'Seco',
      condiciones_transporte: 'Ambiental',
      estado: 'ACTIVO',
      fecha_creacion: '2025-08-02',
      fecha_actualizacion: null,
    },
    {
      id_producto: 103,
      nombre_producto: 'Paracetamol 500mg',
      descripcion_producto: 'Antipirético',
      codigo_digemid: 'DIG003',
      registro_sanitario: 'RS-789',
      id_tipo: 1,
      id_forma: 1,
      condiciones_almacenamiento: 'Seco',
      condiciones_transporte: 'Ambiental',
      estado: 'ACTIVO',
      fecha_creacion: '2025-07-16',
      fecha_actualizacion: null,
    },
    {
      id_producto: 104,
      nombre_producto: 'Amoxicilina 500mg',
      descripcion_producto: 'Antibiótico',
      codigo_digemid: 'DIG004',
      registro_sanitario: 'RS-654',
      id_tipo: 1,
      id_forma: 1,
      condiciones_almacenamiento: 'Seco',
      condiciones_transporte: 'Ambiental',
      estado: 'ACTIVO',
      fecha_creacion: '2025-06-10',
      fecha_actualizacion: null,
    },
    {
      id_producto: 105,
      nombre_producto: 'Omeprazol 20mg',
      descripcion_producto: 'Inhibidor de la bomba de protones',
      codigo_digemid: 'DIG005',
      registro_sanitario: 'RS-321',
      id_tipo: 1,
      id_forma: 1,
      condiciones_almacenamiento: 'Seco',
      condiciones_transporte: 'Ambiental',
      estado: 'ACTIVO',
      fecha_creacion: '2025-05-01',
      fecha_actualizacion: null,
    },
  ];

  /** Busca un producto por su código DIGEMID. Devuelve null si no existe */
  getProductoPorCodigoDigemid(codigo: string): Observable<Producto | null> {
    if (!codigo) {
      return of(null);
    }
    const prod = this.productosCatalogo.find(
      (p) => p.codigo_digemid?.toLowerCase() === codigo.toLowerCase()
    );
    return of(prod || null);
  }
}
