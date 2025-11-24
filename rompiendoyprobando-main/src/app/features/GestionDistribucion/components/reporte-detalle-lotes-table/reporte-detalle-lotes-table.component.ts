import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { DetalleOrdenDistribucion } from '../../models/detalleOrdenDistribucion.model';

@Component({
  selector: 'app-reporte-detalle-lotes-table',
  standalone: false,
  templateUrl: './reporte-detalle-lotes-table.component.html',
  styleUrl: './reporte-detalle-lotes-table.component.css',
})
export class ReporteDetalleLotesTableComponent {

  @Input() detalles: DetalleOrdenDistribucion[] | null = []; 

  displayedColumns: string[] = [
    'idLote', 
    'nombreProducto', 
    'cantidadProducto', 
    'condicionTransporteRequerida', 
    'idVehiculoAsignado'
  ];
}
