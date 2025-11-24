import { NgModule } from "@angular/core";
import { Sidebar } from "./sidebar/sidebar";
import { SidebarFooter } from "./sidebar-footer/sidebar-footer";
import { SidebarHeader } from "./sidebar-header/sidebar-header";
import { SidebarItem } from "./sidebar-item/sidebar-item";
import { SidebarSubitem } from "./sidebar-subitem/sidebar-subitem";
import { Router, RouterLink } from "@angular/router";

@NgModule({
  declarations: [
    SidebarSubitem,
    SidebarItem,
    SidebarHeader,
    SidebarFooter,  
    Sidebar],
  imports: [
    RouterLink],
  exports: [
    SidebarSubitem,
    SidebarItem,
    SidebarHeader,
    SidebarFooter,  
    Sidebar
  ]
})

export class  SidebarModule {}