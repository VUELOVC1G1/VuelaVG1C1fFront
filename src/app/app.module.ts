import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../material/material/material.module";
import { LayoutComponent } from './layout/layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { IniciarsesionComponent } from './modules/iniciarsesion/iniciarsesion.component';
import { NuevopasajeroComponent } from './modules/nuevopasajero/nuevopasajero.component';
import { NuevocharterComponent } from './modules/nuevocharter/nuevocharter.component';


const routes: Routes = [
  { path: 'inicio', component: IniciarsesionComponent,  pathMatch: 'full'},
  { path: 'inicio/inicarsesion', component: IniciarsesionComponent},
  { path: 'inicio/nuevousuario', component: NuevopasajeroComponent},
  { path: 'inicio/nuevocharter', component: NuevocharterComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    IniciarsesionComponent,
    NuevopasajeroComponent,
    NuevocharterComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
