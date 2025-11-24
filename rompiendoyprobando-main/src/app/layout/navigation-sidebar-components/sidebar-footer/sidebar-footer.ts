import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-footer',
  standalone: false,
  templateUrl: './sidebar-footer.html',
  styleUrl: './sidebar-footer.css',
})
export class SidebarFooter {
  appVersion = '1.0.0';
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['/login']);
  }



}
