import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-prod-pertenece-lote',
  templateUrl: './prod-pertenece-lote.component.html',
  styleUrls: ['./prod-pertenece-lote.component.css'],
  standalone: false,
})
export class ProdPerteneceLoteComponent {
  @Input() items: { producto: Producto; cantidad: number }[] = [];
  @Output() eliminar = new EventEmitter<number>();

  displayedColumns = ['id_producto', 'nombre_producto', 'codigo_digemid', 'cantidad', 'acciones'];

  borrar(index: number): void {
    this.eliminar.emit(index);
  }
}
