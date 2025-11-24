import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs';
import { DetalleOrdenDistribucion } from '../models/detalleOrdenDistribucion.model';
import { OrdenDistribucion } from '../models/ordenDistribucion.model';
import { Vehiculo } from '../models/vehiculo.model';
import { SeguimientoVehiculo } from '../models/seguimientoVehiculo.model';
import { DetalleTransporte } from '../models/detalleTransporte.model';
import { LoteProducto } from '../models/loteProducto.model';
import { DetalleOrdenCompleta } from '../models/incidenciasModels/detalleReporteCompleto.model';
import { IncidenciaReporte } from '../models/incidenciasModels/incidenciaReporte.model';
import { IncidenciaTransporteCreatePayload } from '../models/crearIncidencia.model';
import { OrdenReporte } from '../models/incidenciasModels/ordenReporte.model';

@Injectable({
  providedIn: 'root',
})
export class DistribucionService {
  constructor() { }

  private mockOrdenes: OrdenDistribucion[] = [
    { idOrden: 201, idRequerimiento: 305, nombreUsuario: 'Carlos A.', area: 'Farmacia', estado: 'Pendiente', prioridad: 'Alta', fechaEntregaEstimada: '2025-12-01' },
    { idOrden: 202, idRequerimiento: 306, nombreUsuario: 'Laura V.', area: 'Almacén', estado: 'En ruta', prioridad: 'Media', fechaEntregaEstimada: '2025-12-05' },
    { idOrden: 203, idRequerimiento: 307, nombreUsuario: 'Ana M.', area: 'Laboratorio', estado: 'Entregada', prioridad: 'Baja', fechaEntregaEstimada: '2025-11-15' }, // Entregada con incidencias
    { idOrden: 204, idRequerimiento: 308, nombreUsuario: 'Javier P.', area: 'Farmacia', estado: 'Entregada', prioridad: 'Media', fechaEntregaEstimada: '2025-11-16' },
  ];
  
  private mockVehiculos: Vehiculo[] = [
      { idVehiculo: 1, placa: 'ABC-123', capacidad: 5, tipoVehiculo: 'Furgón', condicionTransporte: 'Ambiente', disponible: true },
      { idVehiculo: 2, placa: 'DEF-456', capacidad: 2, tipoVehiculo: 'Camioneta', condicionTransporte: 'Ambiente', disponible: false },
      { idVehiculo: 3, placa: 'GHI-789', capacidad: 3, tipoVehiculo: 'Furgón', condicionTransporte: 'Frío', disponible: true },
  ];

  
  private mockIncidencias: IncidenciaReporte[] = [
      // Incidencias para la Orden 203
      { idIncidencia: 1, idOrden: 203, idVehiculo: 1, idDetalleDist: null, tipoIncidencia: 'Tráfico', descripcion: 'Tráfico pesado no previsto.', impacto: 'Moderado', fechaReporte: '2025-11-15T10:00:00', usuarioReporta: 'Conductor A' },
      { idIncidencia: 2, idOrden: 203, idVehiculo: 1, idDetalleDist: 501, tipoIncidencia: 'Problema de Carga/Descarga', descripcion: 'El empaque del Lote 501 se dañó levemente.', impacto: 'Bajo', fechaReporte: '2025-11-15T14:30:00', usuarioReporta: 'Auxiliar Z' },
  ];


  private mockSeguimientos: SeguimientoVehiculo[] = [
    { idSeguimiento: 1, idOrden: 201, idVehiculo: 1, placaVehiculo: 'ABC-123', estadoActual: 'En Ruta', ubicacionActual: 'Km 50, Carretera Norte', fechaHoraActualizacion: new Date(), proximoDestino: 'Hospital Central', estimadoLlegada: '2025-11-20T16:00:00' },
    { idSeguimiento: 2, idOrden: 202, idVehiculo: 3, placaVehiculo: 'GHI-789', estadoActual: 'Retrasado', ubicacionActual: 'Almacén Principal', fechaHoraActualizacion: new Date(), proximoDestino: 'Clínica Este', estimadoLlegada: '2025-11-20T18:30:00' },
    { idSeguimiento: 3, idOrden: 203, idVehiculo: 1, placaVehiculo: 'ABC-123', estadoActual: 'Entregada', ubicacionActual: 'Hospital Central', fechaHoraActualizacion: '2025-11-15T15:00:00', proximoDestino: 'N/A', estimadoLlegada: '2025-11-15T15:00:00' },
    { idSeguimiento: 4, idOrden: 204, idVehiculo: 2, placaVehiculo: 'DEF-456', estadoActual: 'Entregada', ubicacionActual: 'Cliente Final', fechaHoraActualizacion: '2025-11-16T12:00:00', proximoDestino: 'N/A', estimadoLlegada: '2025-11-16T12:00:00' },
  ];
  
  private mockDetallesTransporte: DetalleTransporte[] = [
      { idLote: 501, nombreProducto: 'Analgesico Común', cantidadTransportada: 100 , incidenciaReportada: false},
      { idLote: 502, nombreProducto: 'Vacuna X', cantidadTransportada: 50 , incidenciaReportada: false},
  ];
  
  private mockLotes: LoteProducto[] = [
      { idLote: 501, idProducto: 101, numeroLote: 'LOTE-A1', cantInicial: 150, cantActual: 100, fechaFabricacion: '2024-01-01', fechaVencimiento: '2025-12-31', estado: 'En Tránsito' },
      { idLote: 502, idProducto: 102, numeroLote: 'LOTE-B2', cantInicial: 80, cantActual: 50, fechaFabricacion: '2024-06-15', fechaVencimiento: '2026-06-15', estado: 'En Tránsito' },
  ];


  /**
   * Obtiene la lista principal de órdenes de distribución.
   * Usado en: ordenes-distribucion-list
   */
  getOrdenesDistribucion(): Observable<OrdenDistribucion[]> {
    return of(this.mockOrdenes);
  }

  /**
   * Obtiene los detalles (lotes) de una orden y las opciones de vehículos
   * que son compatibles con la condición de transporte requerida.
   * Usado en: PopupLoteAsignacionVehiculoComponent
   */
  getDetallesOrdenParaAsignacion(idOrden: number): Observable<DetalleOrdenDistribucion[]> {
    // 💡 Simulación: Un producto requiere 'Ambiente' y otro 'Frío'.
    const mockDetalles: DetalleOrdenDistribucion[] = [
      { 
        idLote: 501, 
        nombreProducto: 'Analgesico Común', 
        cantidadProducto: 100, 
        condicionTransporteRequerida: 'Ambiente', 
        idVehiculoAsignado: null,
        opcionesVehiculo: this.mockVehiculos.filter(v => v.disponible && v.condicionTransporte === 'Ambiente') // Filtra Ambiente
      },
      { 
        idLote: 502, 
        nombreProducto: 'Vacuna X', 
        cantidadProducto: 50, 
        condicionTransporteRequerida: 'Frío', 
        idVehiculoAsignado: null,
        opcionesVehiculo: this.mockVehiculos.filter(v => v.disponible && v.condicionTransporte === 'Frío') // Filtra Frío
      },
    ];

    return of(mockDetalles);
  }

  /**
   * Guarda las asignaciones de vehículos a los lotes y actualiza el estado de la orden.
   */
  guardarAsignacionVehiculos(idOrden: number, detalles: DetalleOrdenDistribucion[]): Observable<void> {
    console.log(`Guardando asignación para Orden ${idOrden}`, detalles);
    // 🛑 Aquí iría la llamada HTTP: return this.http.post<void>(`/api/distribucion/${idOrden}/asignar`, detalles);
    
    // Simulación: Actualizar estado de la orden a 'En Proceso'
    const ordenIndex = this.mockOrdenes.findIndex(o => o.idOrden === idOrden);
    if (ordenIndex !== -1) {
        this.mockOrdenes[ordenIndex].estado = 'Programada';
    }

    return of(undefined);
  }
  

  

  // ... (getOrdenesDistribucion, getDetallesOrdenParaAsignacion, guardarAsignacionVehiculos sin cambios) ...

  /**
   * Obtiene el listado de vehículos que están actualmente en seguimiento (en ruta).
   * Usado en: MonitoreoVehiculosListComponent
   */
  getSeguimientoVehiculos(): Observable<SeguimientoVehiculo[]> {
      return of(this.mockSeguimientos.filter(s => s.estadoActual !== 'Entregada'));
  }
  
  /**
   * Obtiene los lotes que están siendo transportados en un seguimiento específico.
   * Usado en: VehiculoLotesListComponent
   */
  getLotesBySeguimientoId(idSeguimiento: number): Observable<DetalleTransporte[]> {
      // Simulación: Devuelve todos los lotes mock
      return of(this.mockDetallesTransporte);
  }
  
  /**
   * Obtiene la información detallada de un lote específico.
   * Usado en: PopupInfoLoteComponent
   */
  getInfoLote(idLote: number): Observable<LoteProducto> {
      const lote = this.mockLotes.find(l => l.idLote === idLote);
      if (lote) {
          return of(lote);
      }
      return throwError(() => new Error(`Lote con ID ${idLote} no encontrado.`));
  }
  
  /**
   * Obtiene la información detallada de un vehículo (placa, capacidad, etc.).
   * Usado en: MonitoreoVehiculosListComponent (acción 'Info Vehiculo')
   */
  getInfoVehiculo(idVehiculo: number): Observable<Vehiculo> {
      const vehiculo = this.mockVehiculos.find(v => v.idVehiculo === idVehiculo);
      if (vehiculo) {
          return of(vehiculo);
      }
      return throwError(() => new Error(`Vehículo con ID ${idVehiculo} no encontrado.`));
  }

  confirmarEntrega(idOrden: number): Observable<void> {
    console.log(`[DistribucionService] Confirmando entrega para Orden #${idOrden}`);
    
    // 🛑 Aquí iría la llamada HTTP: return this.http.post<void>(`/api/distribucion/ordenes/${idOrden}/confirmar-entrega`);
    
    // Simulación: Cambiar estado de Orden y Seguimiento a 'Completada' / 'Finalizado'
    const ordenIndex = this.mockOrdenes.findIndex(o => o.idOrden === idOrden);
    if (ordenIndex !== -1) {
      this.mockOrdenes[ordenIndex].estado = 'Entregada';
    }
    const seguimientoIndex = this.mockSeguimientos.findIndex(s => s.idOrden === idOrden);
    if (seguimientoIndex !== -1) {
        this.mockSeguimientos[seguimientoIndex].estadoActual = 'Entregada';
    }
    
    return of(undefined);
  }

  cancelarOrden(idOrden: number): Observable<void> {
    console.log(`[DistribucionService] Cancelando Orden #${idOrden}`);

    // 🛑 Aquí iría la llamada HTTP: return this.http.post<void>(`/api/distribucion/ordenes/${idOrden}/cancelar`);

    // Simulación: Cambiar estado de Orden a 'Cancelada'
    const ordenIndex = this.mockOrdenes.findIndex(o => o.idOrden === idOrden);
    if (ordenIndex !== -1) {
        this.mockOrdenes[ordenIndex].estado = 'Cancelada';
    }
    // Opcional: El backend también debería cancelar el seguimiento asociado
    
    return of(undefined);
  }

  getDetalleReporteOrden(idOrden: number): Observable<DetalleOrdenCompleta> {
      // 💡 Simulación de la unión de datos de varias fuentes
      const orden = this.mockOrdenes.find(o => o.idOrden === idOrden);
      const seguimiento = this.mockSeguimientos.find(s => s.idOrden === idOrden);
      
      if (!orden || !seguimiento) {
          return throwError(() => new Error(`Orden #${idOrden} no encontrada para reporte.`));
      }
      
      const detalleLotes: DetalleOrdenDistribucion[] = [
          { idLote: 501, nombreProducto: 'Analgesico Común', cantidadProducto: 100, condicionTransporteRequerida: 'Ambiente', idVehiculoAsignado: 1, opcionesVehiculo: [] },
          { idLote: 502, nombreProducto: 'Vacuna X', cantidadProducto: 50, condicionTransporteRequerida: 'Frío', idVehiculoAsignado: 3, opcionesVehiculo: [] },
      ];

      const reporte: DetalleOrdenCompleta = {
          orden: { ...orden, totalLotes: 2, tieneIncidencias: this.mockIncidencias.some(i => i.idOrden === idOrden) },
          detallesLotes: detalleLotes,
          infoSeguimiento: seguimiento,
          justificacionCierre: (idOrden === 203) 
            ? "Entrega completada con una demora de 30 minutos debido a incidente de tráfico y leve daño en el empaque del Lote 501."
            : "Entrega completada a tiempo sin mayores novedades operativas. El vehículo 1 reportó un leve tráfico, pero no afectó la ETA.",
      };
      
      return of(reporte);
  }
  /**
   * Obtiene la lista de incidencias para una orden específica.
   * Usado en: IncidenciasReporteComponent
   */
  getIncidenciasByOrdenId(idOrden: number): Observable<IncidenciaReporte[]> {
    // Simulación: Filtra el mock de incidencias por el idOrden
    const incidenciasFiltradas = this.mockIncidencias.filter(i => i.idOrden === idOrden);
    return of(incidenciasFiltradas);
  }

  /**
   * Obtiene la lista de órdenes entregadas para el reporte.
   * Usado en: ReportesEntregaListComponent
   */
  getReporteOrdenesEntregadas(): Observable<OrdenReporte[]> {
    const ordenesCompletadas = this.mockOrdenes.filter(o => o.estado === 'Entregada');

    const ordenesReporte: OrdenReporte[] = ordenesCompletadas.map(orden => {
        const tieneIncidencia = this.mockIncidencias.some(i => i.idOrden === orden.idOrden);
        return {
            ...orden,
            totalLotes: 2, // Mock: Asumimos 2 lotes por orden entregada
            tieneIncidencias: tieneIncidencia,
        } as OrdenReporte;
    });

    return of(ordenesReporte);
  }

}
