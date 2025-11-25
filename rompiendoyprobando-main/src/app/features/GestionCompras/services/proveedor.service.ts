import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Proveedor } from '../models/ProveedorModels/proveedor.model';
import { ProveedorCreatePayload } from '../models/ProveedorModels/proveedorCreate.model';
import { ProveedorUpdatePayload } from '../models/ProveedorModels/proveedorUpdate.model';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista completa de proveedores para la tabla.
   * Usado en: ListaProveedoresComponent
   */
  getListadoProveedores(): Observable<Proveedor[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/compras/proveedores`).pipe(
      map(response => response.data)
    );
  }

  /**
   * Crea un nuevo proveedor en el sistema.
   * Usado en: PopupProveedorFormComponent (modo create)
   */
  createProveedor(payload: ProveedorCreatePayload): Observable<Proveedor> {
    return this.http.post<any>(`${environment.apiUrl}/api/compras/proveedores`, payload).pipe(
      map(response => response.data)
    );
  }

  /**
   * Actualiza los datos de un proveedor existente.
   * Usado en: PopupProveedorFormComponent (modo edit)
   */
  updateProveedor(id: number, payload: ProveedorUpdatePayload): Observable<Proveedor> {
    return this.http.put<any>(`${environment.apiUrl}/api/compras/proveedores/${id}`, payload).pipe(
      map(response => response.data)
    );
  }

  /**
   * Elimina lógicamente (o físicamente) un proveedor.
   * Usado en: PopupConfirmacionEliminacionComponent
   */
  deleteProveedor(id: number): Observable<void> {
    // Backend doesn't have DELETE endpoint yet. 
    // Assuming logical deletion via update or just throwing error for now.
    // For now, let's try to disable it via update if possible, or throw error.
    return throwError(() => new Error('Eliminación de proveedores no implementada en backend.'));
  }

}
