import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../models/usuario";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../service/usuario.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmpleadoService} from "../../service/empleado.service";
import {Router} from "@angular/router";
import {UsuariocharterService} from "../../service/usuariocharter.service";
import {PasajeroService} from "../../service/pasajero.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent implements OnInit {
  hide = true;
  logging:boolean=true
  public rol?:String="ND";

  constructor(private usuarioService:UsuarioService,
              private _snackBar: MatSnackBar,
              private empleadoService:EmpleadoService,
              private router:Router,
              private usuariocharterService:UsuariocharterService,
              private pasajeroService:PasajeroService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Inicar sesión")
    setTimeout(() => {
      this.logging=false;
    }, 1000)
  }

  profileFormUsuario = new FormGroup({
    correo: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  iniciarSesionEmplado(){
    this.usuarioService.iniciarUsuario(this.profileFormUsuario.getRawValue()).subscribe(value => {
      if(value.rol=='EMPLEADO'){
        this.empleadoService.getEmpleado(value.id).subscribe(value1 => {
          sessionStorage.clear;
          sessionStorage.setItem('user', JSON.stringify(value1));
          this.router.navigate(['/inicio/home']).then(() => {
            window.location.reload();
          });
        },error => {
          this._snackBar.open(error.error.message, "",{
            duration: 1 * 2000,
          });
        })

      }else {
        this._snackBar.open("Usuario no existe, como empleado", "",{
          duration: 1 * 2000,
        });
      }
    },error => {
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })
  }

  iniciarSesionUsuario(){
    this.usuarioService.iniciarUsuario(this.profileFormUsuario.getRawValue()).subscribe(value => {
      if(value.rol=='PASAJERO'){
        this.pasajeroService.getPasajero(value.id).subscribe(value1 => {
          sessionStorage.clear;
          sessionStorage.setItem('user', JSON.stringify(value1));
          this.router.navigate(['/inicio/home']).then(() => {
            window.location.reload();
          });
        })
      }else {
        this._snackBar.open("Usuario no existe, como pasajero", "",{
          duration: 1 * 2000,
        });
      }
    },error => {
      console.log()
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })
  }

  iniciarSesionCherter(){
    this.usuarioService.iniciarUsuario(this.profileFormUsuario.getRawValue()).subscribe(value => {
      if(value.rol=='CHARTER'){
        this.usuariocharterService.getCharter(value.id).subscribe(value1 => {
          sessionStorage.clear;
          sessionStorage.setItem('user', JSON.stringify(value1));
          this.router.navigate(['/inicio/home']).then(() => {
            window.location.reload();
          });
        })
      }else {
        this._snackBar.open("Usuario no existe, como charter", "",{
          duration: 1 * 2000,
        });
      }
    },error => {
      console.log()
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })
  }


  seleccionrol(rol:String){
    console.log(rol)
    this.rol=rol;
  }

}
