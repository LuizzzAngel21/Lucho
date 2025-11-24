import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramacionService } from '../../services/programacion.service';
import { Producto } from '../../models/producto.model';
import { DetalleRequerimientoAtenderTableComponent } from '../../components/detalle-requerimiento-atender/detalle-requerimiento-atender-table.component';
import { PopupRevisarStockProductoComponent } from '../../overlays/popup-revisar-stock-producto/popup-revisar-stock-producto.component';
import { LoteProducto } from '../../models/lotes_producto.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-disponibilidad-producto',
    templateUrl: './disponibilidad-producto.component.html',
    standalone: true,
    imports: [CommonModule, DetalleRequerimientoAtenderTableComponent, PopupRevisarStockProductoComponent],
    styleUrls: ['./disponibilidad-producto.component.css']
})

export class DisponibilidadProductoComponent implements OnInit {
    reqIdActual: string | null = null;
    productos: (Producto & { decision?: 'COMPRAS' | 'DISTRIBUCION' })[] = [];
    observaciones = '';
    mostrarPopupStock = false;
    lotesProducto: LoteProducto[] = [];
    nombreProductoSeleccionado = '';

    constructor(private programacionService: ProgramacionService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const idFromRoute = this.route.snapshot.paramMap.get('id');
        if (idFromRoute) {
            this.reqIdActual = idFromRoute;
            this.programacionService.loadProductosParaAtender(idFromRoute);
        } else {
            // fallback: primer requerimiento pendiente
            this.programacionService.getRequerimientosPendientesTabla().subscribe(p => {
                if (p.length) {
                    this.reqIdActual = p[0].id_req;
                    this.programacionService.loadProductosParaAtender(this.reqIdActual);
                }
            });
        }
        this.programacionService.getProductosParaAtender().subscribe(lista => {
            // preservar decisiones existentes si recarga
            this.productos = lista.map(m => {
                const prev = this.productos.find(x => x.id_producto === m.id_producto);
                return { ...m, decision: prev?.decision };
            });
        });
    }

    onAtender(payload: { productos: (Producto & { decision?: 'COMPRAS' | 'DISTRIBUCION' })[]; observaciones: string }) {
        if (this.reqIdActual) {
            // Aquí podríamos persistir decisiones antes de aceptar
            this.programacionService.aceptarRequerimiento(this.reqIdActual);
        }
        history.back();
    }

    onVolver() { history.back(); }

    onRevisarStock(producto: Producto) {
        this.nombreProductoSeleccionado = producto.nombre_producto;
        this.programacionService.getLotesByProducto(producto.id_producto).subscribe(l => {
            this.lotesProducto = l;
            this.mostrarPopupStock = true;
        });
    }

    cerrarPopupStock() {
        this.mostrarPopupStock = false;
        this.lotesProducto = [];
        this.nombreProductoSeleccionado = '';
    }
}