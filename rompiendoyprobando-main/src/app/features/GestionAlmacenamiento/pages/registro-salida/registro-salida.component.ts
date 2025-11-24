import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-registro-salida',
  templateUrl: './registro-salida.component.html',
  styleUrls: ['./registro-salida.component.css'],
  standalone: false,
})
export class RegistroSalidaComponent implements OnInit {
  productos: Producto[] = [];
  inventarioParam: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.inventarioParam = this.route.snapshot.queryParamMap.get('inventario');
  }
}
