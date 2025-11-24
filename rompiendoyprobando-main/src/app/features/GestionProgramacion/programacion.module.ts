import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramacionRoutingModule } from './programacion-routing.module';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

//Components
import {RequerimientosPendientesTableComponent} from './components/requerimientos-pendientes-table/requerimientos-pendientes-table.component';

//Overlays

import {PopupDetalleDeRequerimientoComponent} from './overlays/popup-detalle-de-requerimiento/popup-detalle-de-requerimiento.component';
import {PopupDetalleSolicitudDeCompraComponent} from './overlays/popup-detalle-solicitud-de-compra/popup-detalle-solicitud-de-compra.component';
import {PopupDetalleOrdenDistribucionComponent} from './overlays/popup-detalle-de-ordenDistribucion/popup-detalle-ordenDistribucion.component';


// Pages
import { ListaRequerimientosComponent} from './pages/lista-requerimientos-noatendidos/lista-requerimientos-noatendidos.component';
import { ListaRequerimientosAtendidosComponent } from './pages/lista-requerimientos-atendidos/lista-requerimientos-atendidos.component';
import { SearchBarNoAtendidosComponent } from './components/search-bar-no-atendidos/search-bar-no-atendidos.component';

import { SearchBarAtendidosComponent } from './components/search-bar-atendidos/search-bar-atendidos.component';
import { OrdenDistribucionTableComponent } from './components/orden-distribucion-table/orden-distribucion-table.component';
import { SolicitudComprasTableComponent } from './components/solicitud-compras-table/solicitud-compras-table.component';
import { DisponibilidadProductoComponent } from './pages/disponibilidad-producto/disponibilidad-producto.component';

@NgModule({
    declarations: [
        RequerimientosPendientesTableComponent,
        ListaRequerimientosComponent,
        SearchBarNoAtendidosComponent,
    ],
    imports: [
        ProgramacionRoutingModule,
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SearchBarAtendidosComponent,
        OrdenDistribucionTableComponent,
        SolicitudComprasTableComponent,
        ListaRequerimientosAtendidosComponent,
        PopupDetalleDeRequerimientoComponent,
        PopupDetalleSolicitudDeCompraComponent,
        PopupDetalleOrdenDistribucionComponent
    ]
})


export class ProgramacionModule {}
