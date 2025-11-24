import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlmacenamientoService } from '../../services/almacenamiento.service';
import { LotesProducto } from '../../models/lotes_producto.model';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-registro-lote',
  templateUrl: './registro-lote.component.html',
  standalone: false,
  styleUrls: ['./registro-lote.component.css'],
})
export class RegistroLoteComponent implements OnInit {
  lote?: LotesProducto;
  observaciones: string = '';
  // controla la visibilidad del popup de registro de incidencia
  mostrarPopupIncidencia = false;
  // Productos agregados al lote (desde componente search-info-digemid)
  productosDelLote: { producto: Producto; cantidad: number }[] = [];
  errorCarga: string = '';
  displayedColumns: string[] = [
    'id_lote',
    'id_producto',
    'id_orden_compra',
    'numero_lote',
    'fecha_fabricacion',
    'cantidad_inicial',
    'cantidad_actual',
    'estado',
    'ubicacion_almacen',
    'temperatura_almacenamiento',
    'fecha_creacion',
    'fecha_actualizacion',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private almacenamientoService: AlmacenamientoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.errorCarga = 'ID de lote no proporcionado en la ruta.';
      return;
    }
    const numericId = Number(idParam);
    if (isNaN(numericId)) {
      this.errorCarga = 'El parámetro de ruta no es un número válido.';
      return;
    }
    this.almacenamientoService.getLotesProducto().subscribe((lotes) => {
      this.lote = lotes.find((l) => l.id_lote === numericId);
      if (!this.lote) {
        this.errorCarga = `No se encontró información para el lote (${numericId}).`;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/GestionAlmacenamiento']);
  }

  registrarConIncidencia(): void {
    // Abrir el popup para registrar una incidencia relacionada al lote actual
    console.log('Abriendo popup de registro de incidencia para:', this.lote);
    this.mostrarPopupIncidencia = true;
  }

  cerrarPopupIncidencia(): void {
    this.mostrarPopupIncidencia = false;
  }

  handleRegistrarIncidencia(incidencia: any): void {
    // Aquí puedes llamar al servicio para persistir la incidencia si lo deseas
    console.log('Incidencia recibida desde popup:', incidencia);
    // Cerrar popup tras registrar
    this.cerrarPopupIncidencia();
    // Después de registrar la incidencia redirigimos a la lista de lotes
    try {
      this.router.navigate(['/GestionAlmacenamiento']);
    } catch (err) {
      console.error('Error navegando a Lista de Lotes:', err);
    }
  }

  registrarRecepcion(): void {
    console.log('Registro exitoso del lote (LotesProducto):', this.lote);
    this.router.navigate(['/GestionAlmacenamiento']);
  }

  // Maneja agregado de producto desde componente hijo
  handleAgregarProducto(event: { producto: Producto; cantidad: number }): void {
    if (!event?.producto || !event.cantidad || event.cantidad <= 0) {
      return;
    }
    const idx = this.productosDelLote.findIndex(
      (p) => p.producto.id_producto === event.producto.id_producto
    );
    if (idx >= 0) {
      const updated = [...this.productosDelLote];
      const item = updated[idx];
      updated[idx] = { ...item, cantidad: item.cantidad + event.cantidad };
      this.productosDelLote = updated; // reasigna referencia para forzar render
    } else {
      this.productosDelLote = [
        ...this.productosDelLote,
        { producto: event.producto, cantidad: event.cantidad },
      ];
    }
  }

  handleEliminarProducto(index: number): void {
    this.productosDelLote = this.productosDelLote.filter((_, i) => i !== index);
  }

  handleObservacionesChange(text: string): void {
    this.observaciones = text;
  }

  handleRegistrarConIncidencia(obs: string): void {
    this.handleObservacionesChange(obs);
    this.registrarConIncidencia();
  }

  handleRegistrarLote(obs: string): void {
    this.handleObservacionesChange(obs);
    this.registrarRecepcion();
  }
}
