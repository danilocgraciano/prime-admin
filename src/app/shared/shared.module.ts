import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthModule } from "../auth/auth.module";
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { TableComponent } from './table/table.component';
import { RestTableComponent } from './rest-table/rest-table.component';
import { routing } from "../app.routing";

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    routing
  ],
  exports: [HomeComponent],
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarItemComponent,
    TableComponent,
    RestTableComponent
  ]
})
export class SharedModule { }
