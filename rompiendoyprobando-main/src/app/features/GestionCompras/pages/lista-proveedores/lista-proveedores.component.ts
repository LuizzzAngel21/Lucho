import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Proveedor } from '../../models/ProveedorModels/proveedor.model';
import { ProveedorService } from '../../services/proveedor.service';
import { finalize } from 'rxjs';
import { PopupConfirmacionEliminacionComponent } from '../../overlays/popup-confirmacion-eliminacion/popup-confirmacion-eliminacion.component';
import { PopupProveedorFormComponent } from '../../overlays/popup-proveedor-form/popup-proveedor-form.component';
import { ProveedorDialogData, ProveedorDialogResult } from '../../models/ProveedorModels/proveedorDialog.model';
import { ConfirmacionDialogData, ConfirmacionDialogResult } from '../../models/ProveedorModels/proveedorDelete';

@Component({
  selector: 'app-lista-proveedores.component',
  standalone: false,
  templateUrl: './lista-proveedores.component.html',
  styleUrl: './lista-proveedores.component.css',
})
export class ListaProveedoresComponent implements OnInit {
  proveedores: Proveedor[] | null = null;
  isLoading: boolean = true;
  filtroBusqueda: string = '';

  constructor(
    private proveedorService: ProveedorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarProveedores();
  }

  /**
   * Carga el listado inicial de proveedores.
   */
  cargarProveedores(): void {
    this.isLoading = true;
    this.proveedorService.getListadoProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar proveedores:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Maneja el resultado del diálogo de creación/edición y actualiza la lista.
   */
  handleDialogResult(result: ProveedorDialogResult | undefined): void {
    if (result?.success && result.data) {
        const proveedorActualizado = result.data;
        
        // Determinar si es una edición o una creación para actualizar el array
        if (this.proveedores) {
            const index = this.proveedores.findIndex(p => p.id === proveedorActualizado.id);
            if (index !== -1) {
                // Edición
                this.proveedores[index] = proveedorActualizado;
            } else {
                // Creación
                this.proveedores.push(proveedorActualizado);
            }
            // Forzar actualización de la vista
            this.proveedores = [...this.proveedores];
        }
    }
  }

  // --- CRUD METHODS ---

  /**
   * Abre el overlay para registrar un nuevo proveedor.
   */
  onCrearProveedor(): void {
    const data: ProveedorDialogData = { mode: 'create' };
    const dialogRef = this.dialog.open(PopupProveedorFormComponent, {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(this.handleDialogResult.bind(this));
  }

  /**
   * Abre el overlay para modificar un proveedor existente.
   */
  onEditarProveedor(proveedor: Proveedor): void {
    const data: ProveedorDialogData = { mode: 'edit', proveedor };
    const dialogRef = this.dialog.open(PopupProveedorFormComponent, {
      width: '600px',
      data: data
    });
    
    dialogRef.afterClosed().subscribe(this.handleDialogResult.bind(this));
  }

  /**
   * Abre el overlay de confirmación antes de eliminar.
   */
  onEliminarProveedor(proveedor: Proveedor): void {
    const data: ConfirmacionDialogData = {
        titulo: 'Confirmación de Eliminación',
        mensaje: `¿Realmente desea eliminar al proveedor con RUC: ${proveedor.ruc}? Esta acción no se puede deshacer.`,
        itemNombre: proveedor.nombreProveedor
    };

    const dialogRef = this.dialog.open(PopupConfirmacionEliminacionComponent, {
        width: '450px',
        data: data
    });

    dialogRef.afterClosed().subscribe((result: ConfirmacionDialogResult | undefined) => {
        if (result?.confirmado) {
            this.ejecutarEliminacion(proveedor.id);
        }
    });
  }
  
  /**
   * Llama al servicio para ejecutar la eliminación del proveedor.
   */
  ejecutarEliminacion(proveedorId: number): void {
    this.isLoading = true;
    this.proveedorService.deleteProveedor(proveedorId)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
            next: () => {
                alert(`Proveedor #${proveedorId} eliminado con éxito.`);
                // 🛑 Actualizar lista localmente
                if (this.proveedores) {
                    this.proveedores = this.proveedores.filter(p => p.id !== proveedorId);
                    this.proveedores = [...this.proveedores];
                }
            },
            error: (err) => {
                console.error('Error al eliminar proveedor:', err);
                alert('No se pudo eliminar el proveedor. Error de servicio.');
            }
        });
  }

  // --- FILTERING ---

  getProveedoresFiltrados(): Proveedor[] | null {
    if (!this.proveedores) {
        return null;
    }
    if (!this.filtroBusqueda) {
        return this.proveedores;
    }
    const filtro = this.filtroBusqueda.toLowerCase();
    return this.proveedores.filter(p => 
        p.nombreProveedor.toLowerCase().includes(filtro) ||
        p.ruc.includes(filtro)
    );
  }

}
