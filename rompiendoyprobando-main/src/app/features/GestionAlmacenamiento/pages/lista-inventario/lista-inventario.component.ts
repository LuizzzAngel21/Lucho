import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from '../../services/almacenamiento.service';
import { Router } from '@angular/router';
import { Inventario } from '../../models/inventario.model';
import { MovimientoInventario } from '../../models/movimiento_inventario.model';

@Component({
  selector: 'app-lista-inventario',
  standalone: false,
  templateUrl: './lista-inventario.component.html',
  styleUrls: ['./lista-inventario.component.css'],
})
export class ListaInventarioComponent implements OnInit {
  inventario: Inventario[] = [];
  inventarioFiltrado: Inventario[] = [];
  selected: Inventario | null = null;
  reporteSeleccionado: MovimientoInventario | null = null;
  searchTerm: string = '';

  constructor(private almacenamientoService: AlmacenamientoService, private router: Router) {}

  ngOnInit(): void {
    this.almacenamientoService.getInventario().subscribe((data) => {
      this.inventario = data;
      this.inventarioFiltrado = data;
    });
  }

  onSearchTerm(term: string) {
    this.searchTerm = term;
    if (!term) {
      this.inventarioFiltrado = [...this.inventario];
      return;
    }
    this.inventarioFiltrado = this.inventario.filter((item) =>
      item.id_inventario.toString().includes(term)
    );
  }

  get noMatches(): boolean {
    return !!this.searchTerm && this.inventarioFiltrado.length === 0;
  }

  onSelectionChange(item: Inventario | null) {
    this.selected = item;
  }

  verReporteLote(item: Inventario) {
    // Navegación asumida hacia una ruta de reporte de lote.
    // Ajustar si se requiere abrir overlay/dialog en lugar de navegar.
    this.router.navigate(['/GestionAlmacenamiento/reporte-lote'], {
      queryParams: { lote: item.id_lote },
    });
  }

  registrarSalida() {
    const inventarioId = this.selected?.id_inventario;
    this.router.navigate(['/GestionAlmacenamiento/registro-salida'], {
      queryParams: { inventario: inventarioId ?? '' },
    });
  }
}
