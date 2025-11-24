import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-observaciones-accion',
  templateUrl: './observaciones-accion.component.html',
  styleUrls: ['./observaciones-accion.component.css'],
  standalone: false,
})
export class ObservacionesAccionComponent {
  texto: string = '';

  constructor(private router: Router) {}

  despachar() {
    // Aquí se podría llamar al servicio para registrar movimiento de salida
    console.log('Despachar inventario con observaciones:', this.texto);
    this.router.navigate(['/GestionAlmacenamiento/lotes']);
  }
}
