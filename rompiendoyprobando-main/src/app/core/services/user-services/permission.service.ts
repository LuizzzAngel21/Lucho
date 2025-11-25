import { Injectable, signal } from '@angular/core';
import { SIDEBAR_NAV_ITEMS } from '../../constants/navigation-data';
import { NavItem } from '../../models/nav-item.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  // Signal del rol actual (null hasta login)
  private userRole = signal<string | null>(null);

  constructor(private authService: AuthService) {
    // Inicializar desde localStorage si existe sesión previa
    const stored = this.authService.getCurrentUser();
    if (stored?.role) {
      this.userRole.set(stored.role);
    }
  }

  getCurrentRole() {
    return this.userRole.asReadonly();
  }

  setRole(role: string): void {
    this.userRole.set(role);
  }

  hasAccess(requiredRole: string | undefined): boolean {
    if (!requiredRole) return true;
    const current = this.userRole();
    if (!current) return false;

    // ADMIN tiene acceso a todo
    if (current === 'ADMIN') return true;

    console.log(`Checking access: Required=${requiredRole}, Current=${current}`);

    return current === requiredRole || current.toUpperCase() === requiredRole.toUpperCase();
  }

  getFilteredNavItems(): NavItem[] {
    return SIDEBAR_NAV_ITEMS.filter(item => this.hasAccess(item.requiredRole));
  }

  getFirstAccessibleRouteForRole(role: string): string | null {
    // ADMIN puede acceder a cualquier módulo, redirigir al primero disponible
    if (role === 'ADMIN' && SIDEBAR_NAV_ITEMS.length > 0) {
      const firstModule = SIDEBAR_NAV_ITEMS[0];
      const child = firstModule.children?.find(c => !!c.route);
      return child?.route || null;
    }

    const module = SIDEBAR_NAV_ITEMS.find(m => m.requiredRole?.toUpperCase() === role.toUpperCase());
    if (!module) return null;
    // Tomar primer child con route
    const child = module.children?.find(c => !!c.route);
    return child?.route || null;
  }
}
