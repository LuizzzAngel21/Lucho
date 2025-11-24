import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenamientoRoutingModule } from './almacenamiento-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

// Componentes
import { LotesRecibidosTableComponent } from './components/lotes-recibidos-table/lotes-recibidos-table.component';
import { LotesAtendidosTableComponent } from './components/lotes-atendidos-table/lotes-atendidos-table.component';

//Overlays
import { PopupRegistroIncidenciaComponent } from './overlays/popup-registro-incidencia/popup-registro-incidencia.component';
import { PopupReporteLoteComponent } from './overlays/popup-reporte-lote/popup-reporte-lote.component';

//Pages
import { ListaInventarioComponent } from './pages/lista-inventario/lista-inventario.component';
import { ListaLotesComponent } from './pages/lista-lotes/lista-lotes.component';
import { RegistroLoteComponent } from './pages/registro-lote/registro-lote.component';
import { ListaInventarioTableComponent } from './components/lista-inventario-table/lista-inventario-table.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RegistroSalidaComponent } from './pages/registro-salida/registro-salida.component';
import { SearchInfoDespachoComponent } from './components/search-info-despacho/search-info-despacho.component';
import { ObservacionesAccionComponent } from './components/observaciones-accion/observaciones-accion.component';
import { SearchInfoDigemidComponent } from './components/search-info-digemid/search-info-digemid.component';
import { ProdPerteneceLoteComponent } from './components/prod-pertenece-lote/prod-pertenece-lote.component';
import { ObservacionesAccionRegistrarComponent } from './components/observaciones-accion-registrar/observaciones-accion-registrar.component';

@NgModule({
  declarations: [
    ListaLotesComponent,
    LotesRecibidosTableComponent,
    LotesAtendidosTableComponent,
    ListaInventarioTableComponent,
    ListaInventarioComponent,
    PopupRegistroIncidenciaComponent,
    PopupReporteLoteComponent,
    RegistroLoteComponent,
    SearchBarComponent,
    RegistroSalidaComponent,
    SearchInfoDespachoComponent,
    ObservacionesAccionComponent,
    SearchInfoDigemidComponent,
    ProdPerteneceLoteComponent,
    ObservacionesAccionRegistrarComponent,
  ],
  imports: [
    CommonModule,
    AlmacenamientoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
  ],
})
export class AlmacenamientoModule {}
