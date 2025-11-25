import { Component, OnInit } from '@angular/core';
import { ProgramacionService, Requerimiento, RequerimientoRow } from '../../services/programacion.service';
import { DetalleOrdenDistribucion } from '../../models/detalle_ordenDistribucion';
import { DetalleSolicitud } from '../../models/detalle_solicitud';

type ModoTabla = 'DISTRIBUCION' | 'COMPRAS' | 'REQUERIMIENTOS';

import { CommonModule } from '@angular/common';
import { SearchBarAtendidosComponent } from '../../components/search-bar-atendidos/search-bar-atendidos.component';
import { OrdenDistribucionTableComponent } from '../../components/orden-distribucion-table/orden-distribucion-table.component';
import { SolicitudComprasTableComponent } from '../../components/solicitud-compras-table/solicitud-compras-table.component';
import { ProgramacionModule } from '../../programacion.module';
import { PopupDetalleOrdenDistribucionComponent } from '../../overlays/popup-detalle-de-ordenDistribucion/popup-detalle-ordenDistribucion.component';
import { PopupDetalleSolicitudDeCompraComponent } from '../../overlays/popup-detalle-solicitud-de-compra/popup-detalle-solicitud-de-compra.component';
@Component({
  selector: 'app-lista-requerimientos-atendidos',
  standalone: false,
  templateUrl: './lista-requerimientos-atendidos.component.html',
  styleUrls: ['./lista-requerimientos-atendidos.component.css']
})
export class ListaRequerimientosAtendidosComponent implements OnInit {
  currentMode: ModoTabla = 'REQUERIMIENTOS';

  // Requerimientos atendidos
  requerimientosDataOriginal: Requerimiento[] = [];
  filteredRequerimientosData: Requerimiento[] = [];

  // Órdenes de distribución
  ordenDataOriginal: DetalleOrdenDistribucion[] = [];
  filteredOrdenData: DetalleOrdenDistribucion[] = [];

  // Solicitudes de compra
  solicitudDataOriginal: DetalleSolicitud[] = [];
  filteredSolicitudData: DetalleSolicitud[] = [];

  showPopupDistribucion = false;
  distribucionDetalle: DetalleOrdenDistribucion[] = [];
  showPopupSolicitud = false;
  solicitudDetalle: DetalleSolicitud[] = [];

  constructor(private programacionService: ProgramacionService) { }

  ngOnInit(): void {
    // Cargar requerimientos atendidos
    this.programacionService.getRequerimientosAtendidos().subscribe(data => {
      this.requerimientosDataOriginal = data;
      if (this.currentMode === 'REQUERIMIENTOS') this.applyFilter('', this.currentMode);
    });

    // Cargar órdenes de distribución
    this.programacionService.getOrdenDistribucion().subscribe(data => {
      this.ordenDataOriginal = data;
      if (this.currentMode === 'DISTRIBUCION') this.applyFilter('', this.currentMode);
    });

    // Cargar solicitudes de compra
    this.programacionService.getSolicitudCompra().subscribe(data => {
      this.solicitudDataOriginal = data;
      if (this.currentMode === 'COMPRAS') this.applyFilter('', this.currentMode);
    });
  }

  onFilter(evt: { term: string; modo: ModoTabla }) {
    this.currentMode = evt.modo;
    this.applyFilter(evt.term, evt.modo);
  }

  private applyFilter(term: string, modo: ModoTabla) {
    const normalized = term.trim().toLowerCase();
    if (modo === 'REQUERIMIENTOS') {
      this.filteredRequerimientosData = this.requerimientosDataOriginal.filter(r => !normalized || r.id_req.toLowerCase().includes(normalized));
    } else if (modo === 'DISTRIBUCION') {
      this.filteredOrdenData = this.ordenDataOriginal.filter(r => !normalized || r.id_orden_dist.toLowerCase().includes(normalized));
    } else {
      this.filteredSolicitudData = this.solicitudDataOriginal.filter(r => !normalized || r.id_solicitud.toLowerCase().includes(normalized));
    }
  }

  openDistribucion(id: string) {
    this.distribucionDetalle = this.programacionService.getOrdenDistribucionById(id);
    this.showPopupDistribucion = true;
  }

  openSolicitud(id: string) {
    this.solicitudDetalle = this.programacionService.getSolicitudCompraById(id);
    this.showPopupSolicitud = true;
  }
}
