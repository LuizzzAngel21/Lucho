import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {DisponibilidadProductoComponent} from "./pages/disponibilidad-producto/disponibilidad-producto.component";
import { ListaRequerimientosComponent } from './pages/lista-requerimientos-noatendidos/lista-requerimientos-noatendidos.component';
import { ListaRequerimientosAtendidosComponent } from "./pages/lista-requerimientos-atendidos/lista-requerimientos-atendidos.component";
// Se agrega ruta con parámetro para navegar a la disponibilidad de un requerimiento específico
const routes: Routes = [
  { path: '', component: ListaRequerimientosComponent },
  { path: 'lista-requerimiento', component: ListaRequerimientosComponent },
  // Ruta previa sin id (mantener si algún componente legacy la usa)
  { path: 'lista-requerimientos-atendidos', component: ListaRequerimientosAtendidosComponent },
  // Nueva ruta con parámetro id del requerimiento
  { path: 'disponibilidad-producto/:id', component: DisponibilidadProductoComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class ProgramacionRoutingModule {}