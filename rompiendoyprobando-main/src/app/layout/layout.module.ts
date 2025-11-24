import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import {RouterModule} from '@angular/router';

// Material modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { S } from '@angular/cdk/keycodes';
import { SidebarModule } from './navigation-sidebar-components/sidebar.module';
import { HeaderbarModule } from './navigation-headerbar-components/headerbar.module';

import { MatHeaderRow, MatHeaderCell } from "@angular/material/table";

@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [
    SidebarModule,
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatHeaderRow,
    MatHeaderCell,
    
],
  exports: [DashboardLayoutComponent]
})
export class LayoutModule {}
