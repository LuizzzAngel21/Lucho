import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasRoutingModule } from './compras-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';

//Componentes
import { CotizacionProductosTableComponent } from './components/cotizacion-productos-table/cotizacion-productos-table.component';
import { ProveedoresProductosTableComponent } from './components/proveedores-productos-table/proveedores-productos-table.component';
import { SolicitudesCompraTableComponent } from './components/solicitudes-compra-table/solicitudes-compra-table.component';
import { ResumenCompraTableComponent } from './components/resumen-compra-table/resumen-compra-table.component';
import { OrdenesCompraTableComponent } from './components/ordenes-compra-table/ordenes-compra-table.component';
import { ProveedoresTableComponent } from './components/proveedores-table/proveedores-table.component';

//Overlays
import { PopupResumenHistorialComponent } from './overlays/popup-resumen-historial/popup-resumen-historial.component';
import { PopupProveedorProductoComponent } from './overlays/popup-proveedor-producto/popup-proveedor-producto.component';
import { PopupProveedorFormComponent } from './overlays/popup-proveedor-form/popup-proveedor-form.component';
import { PopupConfirmacionEliminacionComponent } from './overlays/popup-confirmacion-eliminacion/popup-confirmacion-eliminacion.component';

//Pages
import { ListaProveedoresComponent } from './pages/lista-proveedores/lista-proveedores.component';
import { CotizacionGeneracionComponent } from './pages/cotizacion-generacion/cotizacion-generacion.component';
import { HistorialComprasComponent } from './pages/historial-compras/historial-compras.component';
import { OrdenCompraResumenComponent } from './pages/orden-compra-resumen/orden-compra-resumen.component';
import { SolicitudesListComponent } from './pages/solicitudes-list/solicitudes-list.component';

@NgModule({
    declarations: [
        PopupConfirmacionEliminacionComponent,
        PopupProveedorFormComponent,
        ProveedoresTableComponent,
        OrdenesCompraTableComponent,
        PopupProveedorProductoComponent,
        PopupResumenHistorialComponent,
        ResumenCompraTableComponent,
        CotizacionGeneracionComponent,
        HistorialComprasComponent,
        OrdenCompraResumenComponent,
        SolicitudesListComponent,
        SolicitudesCompraTableComponent,
        ProveedoresProductosTableComponent,
        CotizacionProductosTableComponent,
        ListaProveedoresComponent
    ],
    imports: [

        MatToolbarModule,
        MatCheckboxModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatTableModule,
        MatChipsModule,
        CommonModule,
        ComprasRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatTooltipModule
    ]

})

export class ComprasModule {}