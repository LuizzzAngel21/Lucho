import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidenciaDialogData, IncidenciaDialogResult } from '../../models/incidenciaDialog.model';
import { IncidenciaService } from '../../services/incidencia.service';
import { IncidenciaTransporteCreatePayload } from '../../models/crearIncidencia.model';


@Component({
  selector: 'app-popup-crear-incidencia',
  standalone: false,
  templateUrl: './popup-crear-incidencia.component.html',
  styleUrl: './popup-crear-incidencia.component.css',
})
export class PopupCrearIncidenciaComponent implements OnInit{

  incidenciaForm!: FormGroup;
  isLoading: boolean = false;
  
  tiposIncidencia = ['Accidente', 'Tráfico', 'Avería Mecánica', 'Retraso Logístico', 'Problema de Carga/Descarga'];
  nivelesImpacto = ['Bajo', 'Moderado', 'Alto'];

  lotesDisponibles: number[] = []; 

  constructor(
    public dialogRef: MatDialogRef<PopupCrearIncidenciaComponent, IncidenciaDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: IncidenciaDialogData,
    private fb: FormBuilder,
    private incidenciaService: IncidenciaService
  ) {}

  ngOnInit(): void {
    // 🛑 Inicializar la lista de lotes con la data inyectada
    this.lotesDisponibles = this.data.lotesDisponibles || [];
    
    this.initForm();
    
    // 🛑 Lógica para escuchar el checkbox y aplicar/remover validación
    this.incidenciaForm.get('problemaConLote')?.valueChanges.subscribe(value => {
        this.toggleLoteField(value);
    });
  }
  
  /**
   * Alterna la validación del campo idDetalleDist y su estado (si es necesario).
   */
  toggleLoteField(hasLoteProblem: boolean): void {
      const idDetalleControl = this.incidenciaForm.get('idDetalleDist');
      
      // Si el problema es con el lote, forzamos que el campo sea obligatorio
      if (hasLoteProblem) {
          idDetalleControl?.setValidators([Validators.required]);
      } else {
          // Si no hay problema con el lote, removemos la validación
          idDetalleControl?.clearValidators();
          idDetalleControl?.setValue(null); // Limpiar el valor para evitar enviar ID incorrecto
      }
      
      idDetalleControl?.updateValueAndValidity();
  }

  /**
   * Inicializa el formulario con los datos inyectados y validadores.
   */
  initForm(): void {
    // Definimos la validación base del campo idDetalleDist como opcional
    const initialLoteValidators = this.data.idDetalleDist ? [Validators.required] : [];
    const initialLoteValue = !!this.data.idDetalleDist;

    this.incidenciaForm = this.fb.group({
      // Datos ocultos/fijos
      idVehiculo: [{ value: this.data.idVehiculo, disabled: true }],
      idOrdenDist: [{ value: this.data.idOrdenDist, disabled: true }],
      
      problemaConLote: [initialLoteValue], 
      // 🛑 NUEVOS CONTROLES: Checkbox y Lote// Inicializado a true si hay idDetalleDist
      idDetalleDist: [{ value: this.data.idDetalleDist, disabled: true }, initialLoteValidators],
      
      // Datos editables
      tipoIncidencia: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      impacto: ['', Validators.required],
    });
  }

  /**
   * Maneja el envío del formulario.
   */
  onSubmit(): void {
    // Forzar la revalidación antes de enviar (importante para validaciones dinámicas)
    this.incidenciaForm.updateValueAndValidity(); 
    
    if (this.incidenciaForm.invalid) {
      this.incidenciaForm.markAllAsTouched();
      return;
    }
    
    const formValue = this.incidenciaForm.getRawValue();

    // 🛑 Lógica para asegurar que idDetalleDist sea null si el checkbox NO está marcado
    const finalDetalleDist = formValue.problemaConLote ? formValue.idDetalleDist : null;

    const payload: IncidenciaTransporteCreatePayload = {
        idVehiculo: formValue.idVehiculo,
        idOrdenDist: formValue.idOrdenDist,
        idUsuarioReporta: this.data.idUsuarioReporta, 
        tipoIncidencia: formValue.tipoIncidencia,
        descripcion: formValue.descripcion,
        impacto: formValue.impacto,
        // 🛑 Usar el valor condicional para el payload
        idDetalleDist: finalDetalleDist, 
    };
    
    this.isLoading = true;

    this.incidenciaService.crearIncidencia(payload)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.dialogRef.close({ success: true });
        },
        error: (err) => {
          console.error('Error al registrar incidencia:', err);
          alert(`Error al registrar la incidencia: ${err.message || 'Error de conexión'}`);
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
  get f() { return this.incidenciaForm.controls; }

}
