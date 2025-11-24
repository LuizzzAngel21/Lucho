import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from '../../services/almacenamiento.service';
import { LotesProducto } from '../../models/lotes_producto.model';
import { Inventario } from '../../models/inventario.model';
import { MovimientoInventario } from '../../models/movimiento_inventario.model';

@Component({
  selector: 'app-lista-lotes',
  templateUrl: './lista-lotes.component.html',
  standalone: false,
  styleUrls: ['./lista-lotes.component.css'],
})
export class ListaLotesComponent implements OnInit {
  lotesRecibidos: LotesProducto[] = [];
  lotesAtendidos: Inventario[] = [];

  reporteSeleccionado: MovimientoInventario | null = null;

  constructor(private almacenamientoService: AlmacenamientoService) {}

  ngOnInit(): void {
    this.almacenamientoService.getLotesProducto().subscribe((data) => (this.lotesRecibidos = data));
    this.almacenamientoService
      .getLotesAtendidos()
      .subscribe((data) => (this.lotesAtendidos = data));
  }

  onRegistrarLote(lote: LotesProducto) {
    console.log('Registrar lote:', lote);
  }

  onVerReporte(item: Inventario) {
    // Buscar el movimiento asociado al inventario seleccionado
    this.almacenamientoService.getMovimientosInventario().subscribe((movimientos) => {
      const movimiento = movimientos.find((m) => m.id_inventario === item.id_inventario);
      if (movimiento) {
        this.reporteSeleccionado = movimiento;
      } else {
        console.warn('No se encontró movimiento para el inventario:', item.id_inventario);
      }
    });
  }

  cerrarPopup() {
    this.reporteSeleccionado = null;
  }

  handleResolverIncidencia(codigoReporte: string) {
    // acción tras resolver incidencia (actualizar lista o cerrar popup)
    console.log('Incidencia resuelta para', codigoReporte);
    this.cerrarPopup();
  }
}
