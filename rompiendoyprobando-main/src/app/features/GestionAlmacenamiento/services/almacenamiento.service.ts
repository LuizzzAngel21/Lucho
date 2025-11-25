import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LotesProducto } from '../models/lotes_producto.model';
import { Inventario } from '../models/inventario.model';
import { MovimientoInventario } from '../models/movimiento_inventario.model';
import { Producto } from '../models/producto.model';
import { environment } from '../../../../environments/environment'; // Assuming environment file exists

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
  private apiUrl = `${environment.apiUrl}/api/almacenamiento`; // Adjust base URL as needed

  constructor(private http: HttpClient) { }

  // Devuelve lotes recibidos (estructura simple para registro) usados aún por la página registro-lote
  getLotesRecibidos(): Observable<LoteRecibido[]> {
    // TODO: Verify endpoint for this. Using mock for now as no direct mapping found.
    // Might need to fetch from Compras or Programacion if not in Almacenamiento
    return of([]);
  }

  getLotesAtendidos(): Observable<Inventario[]> {
    return this.getInventario();
  }

  // Nueva lista de lotes con estructura completa de LotesProducto (para páginas de visualización avanzada)
  getLotesProducto(): Observable<LotesProducto[]> {
    // Mapping to backend structure if needed, or creating a new endpoint
    // For now, returning empty or mapping from inventario if applicable
    return of([]);
  }

  getLotesAlmacenados(): Observable<LoteAlmacenado[]> {
    return this.getInventario().pipe(
      map(inventarios => inventarios.map(inv => ({
        id_lote: inv.idLote.id.toString(),
        id_proveedor: '', // Not directly in InventarioDto
        id_orden_comp: '', // Not directly in InventarioDto
        id_producto: '', // Not directly in InventarioDto
        cantidad: inv.stockActual,
        lote: inv.idLote.numeroLote,
        fecha_caducidad: inv.idLote.fechaVencimiento,
        fecha_almacenamiento: inv.fechaCreacion || '',
        ubicacion: inv.ubicacionEspecifica || ''
      })))
    );
  }

  /**
   * Devuelve el inventario (lotes ya almacenados dentro de un almacén).
   */
  getInventario(): Observable<Inventario[]> {
    return this.http.get<any>(`${this.apiUrl}/inventario`).pipe(
      map(response => response.data)
    );
  }

  /**
   * Movimientos de inventario (registros de ingreso/salida/ajuste) para auditoría/detalle.
   */
  getMovimientosInventario(idInventario: number): Observable<MovimientoInventario[]> {
    return this.http.get<any>(`${this.apiUrl}/inventario/${idInventario}/movimientos`).pipe(
      map(response => response.data)
    );
  }

  getProductosPorInventarioOIdLote(codigo: string): Observable<Producto[]> {
    // Backend doesn't have a direct search by arbitrary code for products in inventory
    // We might need to fetch inventory and filter, or use a specific search endpoint
    return of([]);
  }

  /** Busca un producto por su código DIGEMID. Devuelve null si no existe */
  getProductoPorCodigoDigemid(codigo: string): Observable<Producto | null> {
    // No direct endpoint in Almacenamiento. 
    // Could potentially use ProgramacionController's stock check if it returns product details
    return of(null);
  }

  registrarIncidencia(incidencia: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/incidencias`, incidencia);
  }
}
