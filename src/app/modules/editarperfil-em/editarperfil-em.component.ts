import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmpleadoService} from "../../service/empleado.service";
import {CargoService} from "../../service/cargo.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../models/usuario";
import {Empleado} from "../../models/empleado";

@Component({
  selector: 'app-editarperfil-em',
  templateUrl: './editarperfil-em.component.html',
  styleUrls: ['./editarperfil-em.component.css']
})
export class EditarperfilEmComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private empleadoService:EmpleadoService,
              private cargoService:CargoService,
              private _snackBar: MatSnackBar,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empleadoService.getEmpleado(params['id']).subscribe(value => {
        this.profileFormUsuario.setValue({
          id:value.id,
          cedula: value.cedula,
          nombre: value.nombre,
          apellido: value.apellido,
          cargo: value.cargoDto,
          fechaNacimiento: value.fechaNacimiento,
          correo: value.usuario?.email,
          password: value.usuario?.password,
        })
      })
    })
  }

  profileFormUsuario = new FormGroup({
    id:new FormControl(null),
    cedula: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    nombre: new FormControl('',[Validators.required]),
    apellido: new FormControl('',[Validators.required]),
    cargo: new FormControl('',[Validators.required]),
    fechaNacimiento: new FormControl('',[Validators.required]),
    correo: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  guardarEmpledoa(){
    var usuario: Usuario = new Usuario();
    usuario.correo=this.profileFormUsuario.getRawValue().correo;
    usuario.password=this.profileFormUsuario.getRawValue().password;
    var empleado:Empleado = this.profileFormUsuario.getRawValue();
    empleado.usuario=usuario;
    empleado.estado=true;
    this.empleadoService.putEmpleado(empleado,empleado.id).subscribe(value => {
      this._snackBar.open("Datos modifcados correctamente", "",{
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
