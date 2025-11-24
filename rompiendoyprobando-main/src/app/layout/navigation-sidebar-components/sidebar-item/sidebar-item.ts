import { Component, Input } from '@angular/core';
import { signal } from '@angular/core';
import { SidebarSubitem } from '../sidebar-subitem/sidebar-subitem';
import { NavItem } from 'src/app/core/models/nav-item.model';

@Component({
  selector: 'app-sidebar-item',
  standalone: false,
  templateUrl: './sidebar-item.html',
  styleUrl: './sidebar-item.css',
})
export class SidebarItem {
  @Input({required : true}) module!: NavItem;

  isExpanded = signal(false);

  constructor() { }

  toggleExpand(): void {
    this.isExpanded.update(value => !value);
  }

}
