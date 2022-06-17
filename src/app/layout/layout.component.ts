import { Component, OnInit } from '@angular/core';
import {Empleado} from "../models/empleado";
import {Cargo} from "../models/cargo";
import {Router} from "@angular/router";
import {Usuariocharter} from "../models/usuariocharter";
import {Pasajero} from "../models/pasajero";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  showFiller = false;
  sesion:boolean=true;
  emplados:Empleado = new Empleado();
  charter:Usuariocharter = new Usuariocharter();
  pasajero:Pasajero = new Pasajero();
  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(JSON.parse(sessionStorage['user']))
    try {
      if(JSON.parse(sessionStorage['user']).usuario.rol=="EMPLEADO"){
        this.emplados=JSON.parse(sessionStorage['user'])
        console.log(JSON.parse(sessionStorage['user']))
        this.sesion=false;
      }
      if(JSON.parse(sessionStorage['user']).usuario.rol=="CHARTER"){
        this.charter=JSON.parse(sessionStorage['user'])
        console.log(JSON.parse(sessionStorage['user']))
        this.sesion=false;
      }
      if(JSON.parse(sessionStorage['user']).usuario.rol=="PASAJERO"){
        this.pasajero=JSON.parse(sessionStorage['user'])
        console.log(JSON.parse(sessionStorage['user']))
        this.sesion=false;
      }
    }catch (e){
      this.sesion=true;
    }
  }

  cerrarSesion(){
    sessionStorage.clear;
    localStorage.removeItem("user");
    sessionStorage.setItem('user', JSON.stringify(""));
    console.log(JSON.parse(sessionStorage['user']))
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }



}
