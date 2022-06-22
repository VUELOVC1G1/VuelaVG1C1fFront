import { Component, OnInit } from '@angular/core';
import {Empleado} from "../models/empleado";
import {Cargo} from "../models/cargo";
import {Router} from "@angular/router";
import {Usuariocharter} from "../models/usuariocharter";
import {Pasajero} from "../models/pasajero";
import {NotificacionesService} from "../service/notificaciones.service";
import {Notificacion} from "../models/notificacion";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  logging:boolean=true
  showFiller = false;
  sesion:boolean=true;
  emplados:Empleado = new Empleado();
  charter:Usuariocharter = new Usuariocharter();
  pasajero:Pasajero = new Pasajero();

  notificacions:Notificacion[]=[]

  constructor(private router:Router,
              private notificacionesService:NotificacionesService) { }

  ngOnInit(): void {
    try {
      if(JSON.parse(sessionStorage['user']).usuario.rol=="EMPLEADO"){
        this.emplados=JSON.parse(sessionStorage['user'])
        console.log(JSON.parse(sessionStorage['user']))
        this.sesion=false;
        this.logging=false;
      }
      if(JSON.parse(sessionStorage['user']).usuario.rol=="CHARTER"){
        this.charter=JSON.parse(sessionStorage['user'])
        console.log(JSON.parse(sessionStorage['user']))
        this.sesion=false;
        this.logging=false;
      }
      if(JSON.parse(sessionStorage['user']).usuario.rol=="PASAJERO"){
        this.pasajero=JSON.parse(sessionStorage['user'])
        console.log(JSON.parse(sessionStorage['user']))
        this.sesion=false;
        this.notificacionesService.getNoficaciones( this.pasajero.id).subscribe(value => {
          this.notificacions=value;
          console.log(value,this.pasajero.id)
        })
        this.logging=false;
      }
      this.logging=false;
    }catch (e){
      this.sesion=true;
      this.logging=false;
    }

  }

  cerrarSesion(){
    sessionStorage.clear;
    localStorage.removeItem("user");
    sessionStorage.setItem('user', JSON.stringify(""));
    console.log(JSON.parse(sessionStorage['user']))
    this.router.navigate(['/inicio/home']).then(() => {
      window.location.reload();
    });
  }



}
