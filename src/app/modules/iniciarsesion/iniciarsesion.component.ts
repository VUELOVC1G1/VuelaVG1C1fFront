import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../models/usuario";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../service/usuario.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent implements OnInit {
  hide = true;
  public rol?:String="ND";

  constructor(private usuarioService:UsuarioService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  profileFormUsuario = new FormGroup({
    correo: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  iniciarSesionEmplado(){
    this.usuarioService.iniciarUsuario(this.profileFormUsuario.getRawValue()).subscribe(value => {
      if(value.rol=='EN'){

      }else {
        this._snackBar.open("Usuario no existe, como empleado", "",{
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

  iniciarSesionUsuario(){
    this.usuarioService.iniciarUsuario(this.profileFormUsuario.getRawValue()).subscribe(value => {
      if(value.rol=='CO'){

      }else {
        this._snackBar.open("Usuario no existe, como empleado", "",{
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
      if(value.rol=='CH'){

      }else {
        this._snackBar.open("Usuario no existe, como empleado", "",{
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
