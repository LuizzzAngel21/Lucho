import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Proveedor } from '../../models/ProveedorModels/proveedor.model';
import { ProveedorCreatePayload } from '../../models/ProveedorModels/proveedorCreate.model';
import { ProveedorUpdatePayload } from '../../models/ProveedorModels/proveedorUpdate.model';
import { ProveedorDialogData, ProveedorDialogResult } from '../../models/ProveedorModels/proveedorDialog.model';
import { ProveedorService } from '../../services/proveedor.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-popup-proveedor-form.component',
  standalone: false,
  templateUrl: './popup-proveedor-form.component.html',
  styleUrl: './popup-proveedor-form.component.css',
})
export class PopupProveedorFormComponent implements OnInit{

  proveedorForm!: FormGroup;
  isEditMode: boolean = false;
  dialogTitle: string = 'Crear Nuevo Proveedor';
  isLoading: boolean = false;

  // Referencia al proveedor original (solo en modo edición)
  originalProveedor?: Proveedor;

  constructor(
    public dialogRef: MatDialogRef<PopupProveedorFormComponent, ProveedorDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: ProveedorDialogData,
    private fb: FormBuilder,
    private proveedorService: ProveedorService // 🛑 Inyección del nuevo servicio
  ) {}

  ngOnInit(): void {
    this.isEditMode = this.data.mode === 'edit';
    
    this.initForm();
    
    if (this.isEditMode && this.data.proveedor) {
      this.dialogTitle = `Editar Proveedor N° ${this.data.proveedor.id}`;
      this.originalProveedor = this.data.proveedor;
      this.loadFormData(this.data.proveedor);
    } else {
      this.dialogTitle = 'Registrar Nuevo Proveedor';
    }
  }

  /**
   * Inicializa el formulario con validadores.
   */
  initForm(): void {
    // Nota: El campo RUC solo es editable en modo 'create'
    this.proveedorForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nombreProveedor: ['', [Validators.required, Validators.maxLength(150)]],
      ruc: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]], // Patrón simple de RUC
      direccion: [''],
      telefono: ['', [Validators.maxLength(20)]],
      correo: ['', [Validators.email, Validators.maxLength(150)]],
      estado: [true], // Por defecto, activo
    });
    
    // Deshabilitar RUC en modo edición, ya que ProveedorUpdateDto no lo incluye
    if (this.isEditMode) {
      this.proveedorForm.get('ruc')?.disable();
    } else {
      // Si es creación, estado no es necesario en el payload de envío
      this.proveedorForm.get('estado')?.disable(); 
    }
  }

  /**
   * Carga los datos del proveedor al formulario en modo edición.
   */
  loadFormData(proveedor: Proveedor): void {
    this.proveedorForm.patchValue({
      id: proveedor.id,
      nombreProveedor: proveedor.nombreProveedor,
      ruc: proveedor.ruc,
      direccion: proveedor.direccion,
      telefono: proveedor.telefono,
      correo: proveedor.correo,
      estado: proveedor.estado,
    });
  }

  /**
   * Maneja el envío del formulario para crear o actualizar.
   */
  onSubmit(): void {
    if (this.proveedorForm.invalid) {
      this.proveedorForm.markAllAsTouched();
      return;
    }
    
    const formValue = this.proveedorForm.getRawValue(); // Usa getRawValue para incluir campos deshabilitados (como id/ruc)

    this.isLoading = true;

    if (this.isEditMode) {
      this.handleUpdate(formValue);
    } else {
      this.handleCreate(formValue);
    }
  }

  /**
   * Llama al servicio para crear un nuevo proveedor.
   */
  handleCreate(formValue: any): void {
    const payload: ProveedorCreatePayload = {
      nombreProveedor: formValue.nombreProveedor,
      ruc: formValue.ruc,
      direccion: formValue.direccion,
      telefono: formValue.telefono,
      correo: formValue.correo,
    };
    
    this.proveedorService.createProveedor(payload) // 🛑 Usando ProveedorService
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (newProveedor) => {
          this.dialogRef.close({ success: true, data: newProveedor });
        },
        error: (err) => {
          console.error('Error al crear proveedor:', err);
          alert('Error al crear proveedor. Verifique los datos.');
        }
      });
  }

  /**
   * Llama al servicio para actualizar un proveedor existente.
   */
  handleUpdate(formValue: any): void {
    const proveedorId = formValue.id;
    const payload: ProveedorUpdatePayload = {
      nombreProveedor: formValue.nombreProveedor,
      direccion: formValue.direccion,
      telefono: formValue.telefono,
      correo: formValue.correo,
      estado: formValue.estado,
    };
    
    this.proveedorService.updateProveedor(proveedorId, payload) // 🛑 Usando ProveedorService
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (updatedProveedor) => {
          this.dialogRef.close({ success: true, data: updatedProveedor });
        },
        error: (err) => {
          console.error('Error al actualizar proveedor:', err);
          alert('Error al actualizar proveedor. Verifique los datos.');
        }
      });
  }

  /**
   * Cierra el diálogo sin guardar cambios.
   */
  onCancel(): void {
    this.dialogRef.close({ success: false });
  }

  // Getter para facilitar el acceso a los campos del formulario en el HTML
  get f() { return this.proveedorForm.controls; }

}
