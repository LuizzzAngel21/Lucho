import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export interface AuthUser {
  username: string;
  role: string; // supervisor_alm | supervisor_prog | supervisor_comp | supervisor_dist
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Catálogo de usuarios mock con roles diferenciados
  private mockUsers: Array<{ username: string; password: string; role: string }> = [
    { username: 'supervisor_alm', password: 'alm123', role: 'supervisor_alm' },
    { username: 'supervisor_prog', password: 'prog123', role: 'supervisor_prog' },
    // Se puede extender con compras / distribución
    { username: 'supervisor_comp', password: 'comp123', role: 'supervisor_comp' },
    { username: 'supervisor_dist', password: 'dist123', role: 'supervisor_dist' },
    // Usuario legacy admin que puede probar almacén por defecto
    { username: 'admin', password: 'admin', role: 'supervisor_comp' }
  ];

  login(username: string, password: string): Observable<AuthUser> {
    const found = this.mockUsers.find(u => u.username === username && u.password === password);
    if (!found) {
      return throwError(() => new Error('Credenciales inválidas'));
    }
    const user: AuthUser = { username: found.username, role: found.role };
    localStorage.setItem('user', JSON.stringify(user));
    return of(user);
  }

  register(data: any): Observable<boolean> {
    // Registro simulado: en un escenario real se validaría y persistiría
    console.log('Simulación de registro:', data);
    return of(true);
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getCurrentUser(): AuthUser | null {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }
}
