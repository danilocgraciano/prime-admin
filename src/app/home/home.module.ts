import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthModule } from "../auth/auth.module";
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';

@NgModule({
  imports: [
    CommonModule,
    AuthModule
  ],
  exports: [HomeComponent],
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarItemComponent
  ]
})
export class HomeModule { }
