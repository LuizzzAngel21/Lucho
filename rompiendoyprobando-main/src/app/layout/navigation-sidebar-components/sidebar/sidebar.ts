import { Component, NgModule } from '@angular/core';
import { NavItem } from 'src/app/core/models/nav-item.model';
import { PermissionService } from 'src/app/core/services/user-services/permission.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})

export class Sidebar {
  navItems: NavItem[];

  constructor(private permissionService: PermissionService) { 
    // Llamamos al método del servicio para obtener la lista solo con los módulos permitidos
    this.navItems = this.permissionService.getFilteredNavItems();

    // Opcional: Mostrar el rol y los módulos en la consola para depuración
    console.log(`Sidebar cargada para el rol: ${this.permissionService.getCurrentRole()()}`);
    console.log('Módulos visibles:', this.navItems.map(m => m.displayName));
  }
}
