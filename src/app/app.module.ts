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
import { NuevoempleadoComponent } from './modules/nuevoempleado/nuevoempleado.component';
import { NuevoavionesComponent } from './modules/nuevoaviones/nuevoaviones.component';
import { VerempladosComponent } from './modules/veremplados/veremplados.component';
import { EditarempleadoadComponent } from './modules/editarempleadoad/editarempleadoad.component';
import { VervuelosComponent } from './modules/vervuelos/vervuelos.component';
import { EditaravionesComponent } from './modules/editaraviones/editaraviones.component';
import { NuevarutaComponent } from './modules/nuevaruta/nuevaruta.component';
import { VerrutasComponent } from './modules/verrutas/verrutas.component';


const routes: Routes = [
  { path: 'inicio', component: IniciarsesionComponent,  pathMatch: 'full'},
  { path: 'inicio/inicarsesion', component: IniciarsesionComponent},
  { path: 'inicio/nuevousuario', component: NuevopasajeroComponent},
  { path: 'inicio/nuevocharter', component: NuevocharterComponent},
  { path: 'inicio/nuevoempleado', component: NuevoempleadoComponent},
  { path: 'inicio/verempledos', component: VerempladosComponent},
  { path: 'inicio/editarempleado/:id', component: EditarempleadoadComponent},
  { path: 'inicio/nuevoavion', component: NuevoavionesComponent},
  { path: 'inicio/veraviones', component: VervuelosComponent},
  { path: 'inicio/ediatraviones/:id', component: EditaravionesComponent},
  { path: 'inicio/vuevaruta', component: NuevarutaComponent},
  { path: 'inicio/verrutas', component: VerrutasComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    IniciarsesionComponent,
    NuevopasajeroComponent,
    NuevocharterComponent,
    NuevoempleadoComponent,
    NuevoavionesComponent,
    VerempladosComponent,
    EditarempleadoadComponent,
    VervuelosComponent,
    EditaravionesComponent,
    NuevarutaComponent,
    VerrutasComponent,
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
