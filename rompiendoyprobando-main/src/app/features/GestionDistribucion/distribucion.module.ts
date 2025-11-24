import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistribucionRoutingModule } from './distribucion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatHint } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Pages
import { OrdenesDistribucionListComponent } from './pages/ordenes-distribucion-list/ordenes-distribucion-list.component';
import { MonitoreoVehiculosListComponent } from './pages/monitoreo-vehiculos-list/monitoreo-vehiculos-list.component';
import { VehiculoLotesListComponent } from './pages/vehiculo-lotes-list/vehiculo-lotes-list.component';
import { ReportesEntregaListComponent } from './pages/reportes-entrega-list/reportes-entrega-list.component';
import { IncidenciasReporteComponent } from './pages/incidencias-reporte/incidencias-reporte.component';
import { DetallesReporteComponent } from './pages/detalles-reporte/detalles-reporte.component';

//Overlays
import { PopupLoteAsignacionVehiculoComponent } from './overlays/popup-lote-asignacion-vehiculo/popup-lote-asignacion-vehiculo.component';
import { PopupInfoLoteComponent } from './overlays/popup-info-lote/popup-info-lote.component';
import { PopupInfoVehiculoComponent } from './overlays/popup-info-vehiculo/popup-info-vehiculo.component';
import { PopupConfirmacionEntregaComponent } from './overlays/popup-confirmacion-entrega/popup-confirmacion-entrega.component';
import { PopupCancelarOrdenComponent } from './overlays/popup-cancelar-orden/popup-cancelar-orden.component';
import { PopupCrearIncidenciaComponent } from './overlays/popup-crear-incidencia/popup-crear-incidencia.component';


//Components
import { AsignacionLoteVehiculoTableComponent } from './components/asignacion-lote-vehiculo-table/asignacion-lote-vehiculo-table.component';
import { OrdenesDistribucionTableComponent } from './components/ordenes-distribucion-table/ordenes-distribucion-table.component';
import { VehiculoLotesTableComponent } from './components/vehiculo-lotes-table/vehiculo-lotes-table.component';
import { MonitoreoVehiculosTableComponent } from './components/monitoreo-vehiculos-table/monitoreo-vehiculos-table.component';
import { ReporteOrdenesTableComponent } from './components/reporte-ordenes-table/reporte-ordenes-table.component';
import { ReporteIncidenciasTableComponent } from './components/reporte-incidencias-table/reporte-incidencias-table.component';
import { ReporteDetalleLotesTableComponent } from './components/reporte-detalle-lotes-table/reporte-detalle-lotes-table.component';


@NgModule({
    declarations: [
        DetallesReporteComponent,
        ReporteDetalleLotesTableComponent,
        IncidenciasReporteComponent,
        ReporteIncidenciasTableComponent,
        ReportesEntregaListComponent,
        ReporteOrdenesTableComponent,
        PopupCrearIncidenciaComponent,
        PopupCancelarOrdenComponent,
        PopupConfirmacionEntregaComponent,
        PopupInfoVehiculoComponent,
        PopupInfoLoteComponent,
        VehiculoLotesListComponent,
        MonitoreoVehiculosListComponent,
        PopupInfoLoteComponent,
        VehiculoLotesTableComponent,
        MonitoreoVehiculosTableComponent,
        OrdenesDistribucionListComponent,
        PopupLoteAsignacionVehiculoComponent,
        AsignacionLoteVehiculoTableComponent,
        OrdenesDistribucionTableComponent,

        
    ],
    imports: [
        MatCheckboxModule,
        MatHint,
        MatDialogModule,
        MatToolbarModule, 
        MatProgressSpinnerModule,
        DistribucionRoutingModule,
        MatOptionModule,
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
    ]
})

export class DistribucionModule {}