import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({  
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})


export class DashboardLayoutComponent {
  sidebarOpen = true;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']);
  }
}
