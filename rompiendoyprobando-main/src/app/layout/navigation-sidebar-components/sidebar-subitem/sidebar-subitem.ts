import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem } from 'src/app/core/models/nav-item.model';

@Component({
  selector: 'app-sidebar-subitem',
  standalone: false,
  templateUrl: './sidebar-subitem.html',
  styleUrl: './sidebar-subitem.css',
})
export class SidebarSubitem {
  @Input({required : true}) item!: NavItem;

  constructor() { }

}