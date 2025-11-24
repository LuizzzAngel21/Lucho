import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Proveedor } from '../models/ProveedorModels/proveedor.model';
import { ProveedorCreatePayload } from '../models/ProveedorModels/proveedorCreate.model';
import { ProveedorUpdatePayload } from '../models/ProveedorModels/proveedorUpdate.model';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  // Simulación de datos en memoria para el CRUD
  private proveedoresMock: Proveedor[] = [
    { id: 1, nombreProveedor: 'TecnoCorp SA', ruc: '20123456781', direccion: 'Av. Los Andes 123', telefono: '987654321', correo: 'ventas@tecnocorp.com', estado: true },
    { id: 2, nombreProveedor: 'Global Supply SRL', ruc: '20987654322', direccion: 'Calle Central 456', telefono: '998877665', correo: 'contacto@globalsupply.com', estado: true },
    { id: 3, nombreProveedor: 'Metalurgica Fénix', ruc: '20112233443', direccion: 'Jr. Aceros 789', telefono: '900112233', correo: 'info@fenix.pe', estado: false },
  ];
  private nextId = 4;

  constructor(/* private http: HttpClient */) { }

  /**
   * Obtiene la lista completa de proveedores para la tabla.
   * Usado en: ListaProveedoresComponent
   */
  getListadoProveedores(): Observable<Proveedor[]> {
    console.log('[ProveedorService] Obteniendo listado de proveedores.');
    // 💡 Implementación real: return this.http.get<Proveedor[]>('/api/proveedores');
    return of(this.proveedoresMock);
  }

  /**
   * Crea un nuevo proveedor en el sistema.
   * Usado en: PopupProveedorFormComponent (modo create)
   */
  createProveedor(payload: ProveedorCreatePayload): Observable<Proveedor> {
    console.log('[ProveedorService] Creando proveedor:', payload);
    // 💡 Implementación real: return this.http.post<Proveedor>('/api/proveedores', payload);

    const newProveedor: Proveedor = {
      id: this.nextId++,
      nombreProveedor: payload.nombreProveedor,
      ruc: payload.ruc,
      direccion: payload.direccion,
      telefono: payload.telefono,
      correo: payload.correo,
      estado: true, // Por defecto al crear
    };

    this.proveedoresMock.push(newProveedor);
    return of(newProveedor);
  }

  /**
   * Actualiza los datos de un proveedor existente.
   * Usado en: PopupProveedorFormComponent (modo edit)
   */
  updateProveedor(id: number, payload: ProveedorUpdatePayload): Observable<Proveedor> {
    console.log(`[ProveedorService] Actualizando proveedor ${id}:`, payload);
    // 💡 Implementación real: return this.http.put<Proveedor>(`/api/proveedores/${id}`, payload);
    
    const index = this.proveedoresMock.findIndex(p => p.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Proveedor con ID ${id} no encontrado.`));
    }

    // Mantener RUC (que no viene en el payload de actualización)
    const updatedProveedor: Proveedor = {
        ...this.proveedoresMock[index],
        ...payload
    };

    this.proveedoresMock[index] = updatedProveedor;
    return of(updatedProveedor);
  }

  /**
   * Elimina lógicamente (o físicamente) un proveedor.
   * Usado en: PopupConfirmacionEliminacionComponent
   */
  deleteProveedor(id: number): Observable<void> {
    console.log(`[ProveedorService] Eliminando proveedor ${id}`);
    // 💡 Implementación real: return this.http.delete<void>(`/api/proveedores/${id}`);
    
    const initialLength = this.proveedoresMock.length;
    this.proveedoresMock = this.proveedoresMock.filter(p => p.id !== id);

    if (this.proveedoresMock.length === initialLength) {
        return throwError(() => new Error(`Proveedor con ID ${id} no encontrado.`));
    }

    return of(undefined);
  }
  
}
