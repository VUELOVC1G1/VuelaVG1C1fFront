import { Component, OnInit } from '@angular/core';
import {PasajeroService} from "../../service/pasajero.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../models/usuario";
import {Pasajero} from "../../models/pasajero";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-nuevopasajero',
  templateUrl: './nuevopasajero.component.html',
  styleUrls: ['./nuevopasajero.component.css']
})
export class NuevopasajeroComponent implements OnInit {
  logging:boolean=true
  constructor(private pasajeroService:PasajeroService,
              private _snackBar: MatSnackBar,
              private router:Router,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Nuevo Pasajero")
    setTimeout(() => {
      this.logging=false;
    }, 1000)
  }

  profileFormUsuario = new FormGroup({
    cedula: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    nombre: new FormControl('',[Validators.required]),
    apellido: new FormControl('',[Validators.required]),
    fechaNacimiento: new FormControl('',[Validators.required]),
    correo: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  guardarPasajero(){
    var usuario: Usuario = new Usuario();
    usuario.correo=this.profileFormUsuario.getRawValue().correo;
    usuario.password=this.profileFormUsuario.getRawValue().password;
    usuario.rol="CO";
    var pasajero:Pasajero = this.profileFormUsuario.getRawValue();
    pasajero.usuario=usuario;
    this.pasajeroService.postPasajero(pasajero).subscribe(value => {
      this._snackBar.open("Usuario creado correctamente", "",{
        duration: 1 * 2000,
      });
      this.router.navigate(['/inicio/inicarsesion'])
    },error => {
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })
  }



}
