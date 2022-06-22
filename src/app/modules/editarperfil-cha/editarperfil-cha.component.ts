import {Component, OnInit} from '@angular/core';
import {UsuariocharterService} from "../../service/usuariocharter.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmpleadoService} from "../../service/empleado.service";
import {Usuario} from "../../models/usuario";
import {Usuariocharter} from "../../models/usuariocharter";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-editarperfil-cha',
  templateUrl: './editarperfil-cha.component.html',
  styleUrls: ['./editarperfil-cha.component.css']
})
export class EditarperfilChaComponent implements OnInit {
  logging:boolean=true
  constructor(private usuariocharterService: UsuariocharterService,
              private _snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private empleadoService:EmpleadoService,
              private router:Router,
              private title: Title) {
  }


  profileFormUsuario = new FormGroup({
    id:new FormControl(null),
    ruc: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.pattern("[0-9]+")]),
    empresa: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.title.setTitle("Editar Perfil")
    this.activatedRoute.params.subscribe(params => {
      this.usuariocharterService.getCharter(params['id']).subscribe(value => {
        this.logging=false;
        this.profileFormUsuario.setValue({
          id: value.id,
          ruc: value.ruc,
          empresa:value.empresa,
          correo: value.usuario?.email,
          password: value.usuario?.password,
        })
      },error => {
        this.logging=false;
      })
    })
  }

  guardarCharter(){
    var usuario: Usuario = new Usuario();
    usuario.correo=this.profileFormUsuario.getRawValue().correo;
    usuario.password=this.profileFormUsuario.getRawValue().password;
    usuario.rol="CH";
    var charter:Usuariocharter = this.profileFormUsuario.getRawValue();
    charter.usuario=usuario;
    this.usuariocharterService.putCharter(charter.id,charter).subscribe(value => {
      this._snackBar.open("Datos modificados correctamente", "",{
        duration: 1 * 2000,
      });
      this.router.navigate(['/inicio/home'])
    },error => {
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })
  }

}
