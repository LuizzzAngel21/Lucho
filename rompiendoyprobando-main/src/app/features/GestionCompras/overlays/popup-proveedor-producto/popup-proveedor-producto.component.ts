import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { PopupProveedorProductoData, PopupProveedorProductoResult } from '../../models/dialogData.model';
import { ProveedorProductoCotizacion } from '../../models/proveedorProductoCotizacion.model';
import { ComprasService } from '../../services/compras.service'; // Necesitaremos un servicio

import { ProveedoresProductosTableComponent } from '../../components/proveedores-productos-table/proveedores-productos-table.component';


@Component({
  selector: 'app-popup-proveedor-producto.component',
  standalone: false,
  templateUrl: './popup-proveedor-producto.component.html',
  styleUrl: './popup-proveedor-producto.component.css',
})
export class PopupProveedorProductoComponent implements OnInit{

  productoId: number;
  productoNombre: string;
  
  proveedoresDisponibles: ProveedorProductoCotizacion[] = [];
  isLoading = true;

  constructor(
    // Para cerrar el diálogo y devolver datos
    public dialogRef: MatDialogRef<PopupProveedorProductoComponent, PopupProveedorProductoResult>,
    
    // Para inyectar los datos de entrada (el ProductoCotizacion)
    @Inject(MAT_DIALOG_DATA) public data: PopupProveedorProductoData,
    
    private comprasService: ComprasService // Servicio para obtener datos
  ) {
    this.productoId = data.producto.idProducto;
    this.productoNombre = data.producto.nombreProducto;
  }

  ngOnInit(): void {
    // 💡 Lógica para obtener los proveedores disponibles para el producto
    this.comprasService.getProveedoresByProductoId(this.productoId)
      .subscribe({
        next: (proveedores) => {
          this.proveedoresDisponibles = proveedores;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error al cargar proveedores:", err);
          this.isLoading = false;
          // Manejar error (e.g., mostrar mensaje)
        }
      });
  }

  /**
   * Se llama cuando la tabla hija emite un proveedor seleccionado.
   * Cierra el diálogo y devuelve el objeto seleccionado.
   */
  onProveedorSeleccionado(proveedor: ProveedorProductoCotizacion): void {
    const resultado: PopupProveedorProductoResult = {
      proveedorSeleccionado: proveedor
    };
    this.dialogRef.close(resultado);
  }

  /**
   * Cierra el diálogo sin seleccionar ningún proveedor (cancelar).
   */
  onCancel(): void {
    this.dialogRef.close();
  }

}
