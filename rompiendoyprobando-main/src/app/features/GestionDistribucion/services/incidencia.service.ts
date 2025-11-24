import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs'; 
import { IncidenciaTransporteCreatePayload } from '../models/crearIncidencia.model';

@Injectable({
  providedIn: 'root',
})
export class IncidenciaService {
  crearIncidencia(payload: IncidenciaTransporteCreatePayload): Observable<{ success: true }> {
    console.log('[IncidenciaService] Registrando nueva incidencia:', payload);
    
    // 🛑 Aquí iría la llamada HTTP: return this.http.post<void>('/api/incidencias', payload);
    
    // Simulación: Falla si la descripción es muy corta
    if (payload.descripcion.length < 5) {
        return throwError(() => new Error('La descripción debe ser más detallada.'));
    }

    // Simula una respuesta exitosa
    return of({ success: true });
  }
  
}
