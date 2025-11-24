import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



import { MonitoreoVehiculosListComponent } from "./pages/monitoreo-vehiculos-list/monitoreo-vehiculos-list.component";
import { OrdenesDistribucionListComponent } from "./pages/ordenes-distribucion-list/ordenes-distribucion-list.component";
import { VehiculoLotesListComponent } from "./pages/vehiculo-lotes-list/vehiculo-lotes-list.component";
import { ReporteOrdenesTableComponent } from "./components/reporte-ordenes-table/reporte-ordenes-table.component";
import { IncidenciasReporteComponent } from "./pages/incidencias-reporte/incidencias-reporte.component";
import { DetallesReporteComponent } from "./pages/detalles-reporte/detalles-reporte.component";
import { ReportesEntregaListComponent } from "./pages/reportes-entrega-list/reportes-entrega-list.component";

const routes: Routes = [
  { path: '', component: OrdenesDistribucionListComponent},
  { path: 'asignacion', component: OrdenesDistribucionListComponent},
  { path: 'monitoreo', component: MonitoreoVehiculosListComponent},
  { path: 'reportes', component: ReportesEntregaListComponent},
  { path: 'vehiculos/lotes/:idSeguimiento', component: VehiculoLotesListComponent},
  { path: 'reportes/incidencias/:idOrden', component: IncidenciasReporteComponent},
  { path: 'reportes/detalles/:idOrden', component: DetallesReporteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class DistribucionRoutingModule {}