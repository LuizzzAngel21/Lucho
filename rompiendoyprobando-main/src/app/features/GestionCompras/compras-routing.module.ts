import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProveedoresComponent } from './pages/lista-proveedores/lista-proveedores.component';
import { SolicitudesListComponent } from './pages/solicitudes-list/solicitudes-list.component';
import { CotizacionGeneracionComponent } from './pages/cotizacion-generacion/cotizacion-generacion.component';
import { HistorialComprasComponent } from './pages/historial-compras/historial-compras.component';
import { OrdenCompraResumenComponent } from './pages/orden-compra-resumen/orden-compra-resumen.component';

const routes: Routes = [
  // 1. Ruta por defecto: Redirige al listado de solicitudes
    { 
        path: '', 
        redirectTo: 'solicitudes-pendientes', 
        pathMatch: 'full' 
    },

    // 2. LISTADO DE SOLICITUDES PENDIENTES
    // Nota: Reemplazo 'ordenes' (que llevaba a Solicitudes) por un nombre más claro.
    { 
        path: 'solicitudes-pendientes', 
        component: SolicitudesListComponent,
        // Opcional: data: { title: 'Solicitudes Pendientes' }
    },
    
    // 3. GENERACIÓN DE COTIZACIÓN
    // Necesita el ID de la solicitud (idSolicitud) para cargar sus productos
    { 
        path: 'cotizacion-generacion/:idSolicitud', 
        component: CotizacionGeneracionComponent 
    },

    // 4. HISTORIAL DE COMPRAS (LISTADO DE ÓRDENES)
    { 
        path: 'historial-compras', 
        component: HistorialComprasComponent 
    },
    
    // 5. RESUMEN / DETALLE DE ORDEN DE COMPRA
    // Es la vista final, necesita el ID de la orden (idOrden)
    { 
        path: 'orden-compra-resumen/:idOrden', 
        component: OrdenCompraResumenComponent 
    },

    // 6. LISTA DE PROVEEDORES (Ruta existente)
    { 
        path: 'lista-proveedores', 
        component: ListaProveedoresComponent 
    },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule {}
