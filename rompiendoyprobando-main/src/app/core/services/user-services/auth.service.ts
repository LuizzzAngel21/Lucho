import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface AuthUser {
  username: string;
  role: string;
  email?: string;
  id?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Ahora apuntamos a la URL real del backend
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthUser> {
    // Enviamos POST al backend real
    return this.http.post<any>(`${this.apiUrl}/login`, { nombreUsuario: username, contrasena: password }).pipe(
      map(response => {
        if (response.success) {
          const data = response.data;
          const user: AuthUser = {
            username: data.nombreUsuario,
            role: data.rol,
            id: data.idUsuario
          };
          // Guardamos el usuario en el navegador
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        }
        throw new Error('Error en login');
      }),
      catchError(err => {
        console.error('Error de autenticación:', err);
        return throwError(() => new Error('Credenciales inválidas'));
      })
    );
  }


  // --- AGREGA ESTO AQUÍ ---
  register(data: any): Observable<any> {
    // Intentamos enviarlo al backend. Si no tienes endpoint de registro, 
    // dará error 404 al usarlo, pero arregla la compilación por ahora.
    return this.http.post(`${this.apiUrl}/register`, data);
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