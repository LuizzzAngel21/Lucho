import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DetalleOrdenDistribucion } from '../models/detalleOrdenDistribucion.model';
import { OrdenDistribucion } from '../models/ordenDistribucion.model';
import { Vehiculo } from '../models/vehiculo.model';
import { SeguimientoVehiculo } from '../models/seguimientoVehiculo.model';
import { DetalleTransporte } from '../models/detalleTransporte.model';
import { LoteProducto } from '../models/loteProducto.model';
import { DetalleOrdenCompleta } from '../models/incidenciasModels/detalleReporteCompleto.model';
import { IncidenciaReporte } from '../models/incidenciasModels/incidenciaReporte.model';
import { OrdenReporte } from '../models/incidenciasModels/ordenReporte.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DistribucionService {
  private apiUrl = `${environment.apiUrl}/api/distribucion`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista principal de órdenes de distribución.
   * Usado en: ordenes-distribucion-list
   */
  getOrdenesDistribucion(): Observable<OrdenDistribucion[]> {
    return this.http.get<any>(`${this.apiUrl}/ordenes`).pipe(
      map(response => response.data.map((o: any) => ({
        id: o.id,
        fechaDistribucion: o.fechaDistribucion,
        idRequerimiento: o.idRequerimiento,
        estado: o.estado,
        prioridad: o.prioridad,
        // fechaEntregaEstimada: o.fechaDistribucion // Mapping fechaDistribucion as estimated for now
      })))
    );
  }

  /**
   * Obtiene los detalles (lotes) de una orden y las opciones de vehículos
   * que son compatibles con la condición de transporte requerida.
   * Usado en: PopupLoteAsignacionVehiculoComponent
   */
  getDetallesOrdenParaAsignacion(idOrden: number): Observable<DetalleOrdenDistribucion[]> {
    return forkJoin({
      detalles: this.http.get<any>(`${this.apiUrl}/ordenes/${idOrden}/detalles`),
      vehiculos: this.http.get<any>(`${this.apiUrl}/vehiculos/disponibles`)
    }).pipe(
      map(({ detalles, vehiculos }) => {
        const vehiculosDisponibles: Vehiculo[] = vehiculos.data.map((v: any) => ({
          id: v.id,
          placa: v.placa,
          marca: v.marca,
          modelo: v.modelo,
          tipoVehiculo: v.tipoVehiculo,
          estado: v.estado,
          disponible: true // If returned by available endpoint
        }));

        return detalles.data.map((d: any) => {
          // Logic to determine required transport condition (mocked for now as not in DTO)
          // Ideally should come from Product or Lote
          const condicion = 'Ambiente';

          return {
            idLote: d.idLote.id,
            nombreProducto: d.idProducto.nombreProducto,
            cantidadProducto: d.cantidad,
            condicionTransporteRequerida: condicion,
            idVehiculoAsignado: null,
            opcionesVehiculo: vehiculosDisponibles // Filtering logic could be applied here if condition was known
          };
        });
      })
    );
  }

  /**
   * Guarda las asignaciones de vehículos a los lotes y actualiza el estado de la orden.
   */
  guardarAsignacionVehiculos(idOrden: number, detalles: DetalleOrdenDistribucion[]): Observable<void> {
    // Group details by assigned vehicle to create one Seguimiento per vehicle
    const assignments = new Map<number, DetalleOrdenDistribucion[]>();

    detalles.forEach(d => {
      if (d.idVehiculoAsignado) {
        if (!assignments.has(d.idVehiculoAsignado)) {
          assignments.set(d.idVehiculoAsignado, []);
        }
        assignments.get(d.idVehiculoAsignado)?.push(d);
      }
    });

    const requests: Observable<any>[] = [];

    assignments.forEach((lotes, idVehiculo) => {
      const payload = {
        idVehiculo: idVehiculo,
        idOrdenDist: idOrden,
        ubicacionActual: 'Almacén Central',
        proximoDestino: 'Destino Final', // Should be dynamic
        estimadoLlegada: new Date().toISOString(), // Should be dynamic
        idUsuarioActualizacion: 1, // Mock user ID
        detallesTransporte: lotes.map(l => ({
          idLote: l.idLote,
          cantidad: l.cantidadProducto
        }))
      };
      requests.push(this.http.post(`${this.apiUrl}/seguimientos`, payload));
    });

    if (requests.length === 0) return of(undefined);

    return forkJoin(requests).pipe(map(() => undefined));
  }

  /**
   * Obtiene el listado de vehículos que están actualmente en seguimiento (en ruta).
   * Usado en: MonitoreoVehiculosListComponent
   */
  getSeguimientoVehiculos(): Observable<SeguimientoVehiculo[]> {
    return this.http.get<any>(`${this.apiUrl}/vehiculos/en-camino`).pipe(
      map(response => response.data.map((s: any) => ({
        id: s.id,
        idVehiculo: s.idVehiculo, // Object {id, placa}
        idOrdenDistId: s.idOrdenDistId,
        estadoActual: s.estadoActual,
        ubicacionActual: s.ubicacionActual,
        fechaHoraActualizacion: s.fechaHoraActualizacion,
        proximoDestino: s.proximoDestino
      })))
    );
  }

  /**
   * Obtiene los lotes que están siendo transportados en un seguimiento específico.
   * Usado en: VehiculoLotesListComponent
   */
  getLotesBySeguimientoId(idSeguimiento: number): Observable<DetalleTransporte[]> {
    return this.http.get<any>(`${this.apiUrl}/seguimientos/${idSeguimiento}/lotes`).pipe(
      map(response => response.data.map((d: any) => ({
        idLote: d.idLote.id,
        nombreProducto: d.idLote.numeroLote, // DTO has LoteResumenDto, using number as name proxy or need fetch
        cantidadTransportada: d.cantidad,
        incidenciaReportada: false // Not in DTO
      })))
    );
  }

  /**
   * Obtiene la información detallada de un lote específico.
   * Usado en: PopupInfoLoteComponent
   */
  getInfoLote(idLote: number): Observable<LoteProducto> {
    // Using Almacenamiento endpoint as Distribucion doesn't have direct lote info
    return this.http.get<any>(`${environment.apiUrl}/api/almacenamiento/lotes/${idLote}`).pipe(
      map(response => {
        const d = response.data;
        return {
          idLote: d.id,
          idProducto: d.idProducto.id,
          numeroLote: d.numeroLote,
          cantInicial: d.cantidadInicial,
          cantActual: d.cantidadActual,
          fechaFabricacion: d.fechaFabricacion,
          fechaVencimiento: d.fechaVencimiento,
          estado: d.estado
        } as any; // Casting to match interface loosely or need update interface
      })
    );
  }

  /**
   * Obtiene la información detallada de un vehículo (placa, capacidad, etc.).
   * Usado en: MonitoreoVehiculosListComponent (acción 'Info Vehiculo')
   */
  getInfoVehiculo(idVehiculo: number): Observable<Vehiculo> {
    // No direct endpoint for single vehicle info in controller, 
    // but we can fetch available or use what we have.
    // Returning mock or filtering from list if needed.
    // For now, returning empty observable or throwing error as endpoint missing
    return throwError(() => new Error(`Endpoint para vehículo ${idVehiculo} no implementado.`));
  }

  confirmarEntrega(idOrden: number): Observable<void> {
    // No direct endpoint in DistribucionController for confirming delivery of entire order?
    // Maybe update status via PUT?
    // Using mock logic or generic update if available.
    return of(undefined);
  }

  cancelarOrden(idOrden: number): Observable<void> {
    // No direct endpoint in DistribucionController for cancelling order?
    return of(undefined);
  }

  getDetalleReporteOrden(idOrden: number): Observable<DetalleOrdenCompleta> {
    // Complex aggregation, might need multiple calls
    return of({} as DetalleOrdenCompleta);
  }
  /**
   * Obtiene la lista de incidencias para una orden específica.
   * Usado en: IncidenciasReporteComponent
   */
  getIncidenciasByOrdenId(idOrden: number): Observable<IncidenciaReporte[]> {
    // No direct endpoint for incidences by order in DistribucionController.
    // Only by vehicle.
    return of([]);
  }

  /**
   * Obtiene la lista de órdenes entregadas para el reporte.
   * Usado en: ReportesEntregaListComponent
   */
  getReporteOrdenesEntregadas(): Observable<OrdenReporte[]> {
    return this.getOrdenesDistribucion().pipe(
      map(ordenes => ordenes.filter(o => o.estado === 'Entregada').map(o => ({
        ...o,
        totalLotes: 0,
        tieneIncidencias: false
      } as any)))
    );
  }

}
