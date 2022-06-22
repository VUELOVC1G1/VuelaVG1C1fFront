import { Component, OnInit } from '@angular/core';
import {PasajeroService} from "../../service/pasajero.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsuariocharterService} from "../../service/usuariocharter.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../models/usuario";
import {Pasajero} from "../../models/pasajero";
import {Usuariocharter} from "../../models/usuariocharter";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-nuevocharter',
  templateUrl: './nuevocharter.component.html',
  styleUrls: ['./nuevocharter.component.css']
})
export class NuevocharterComponent implements OnInit {

  logging:boolean=true
  constructor(private usuariocharterService:UsuariocharterService,
              private _snackBar: MatSnackBar,
              private router:Router,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Nuevo charter")
    setTimeout(() => {
      this.logging=false;
    }, 1000)
  }

  profileFormUsuario = new FormGroup({
    ruc: new FormControl('',[Validators.required, Validators.maxLength(13),Validators.pattern("[0-9]+")]),
    empresa: new FormControl('',[Validators.required]),
    correo: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  guardarCharter(){
    var usuario: Usuario = new Usuario();
    usuario.correo=this.profileFormUsuario.getRawValue().correo;
    usuario.password=this.profileFormUsuario.getRawValue().password;
    usuario.rol="CH";
    var charter:Usuariocharter = this.profileFormUsuario.getRawValue();
    charter.usuario=usuario;
    this.usuariocharterService.postCharter(charter).subscribe(value => {
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
