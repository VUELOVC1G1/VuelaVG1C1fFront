import { Component, OnInit } from '@angular/core';
import {CargoService} from "../../service/cargo.service";
import {Cargo} from "../../models/cargo";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../models/usuario";
import {Pasajero} from "../../models/pasajero";
import {Empleado} from "../../models/empleado";
import {EmpleadoService} from "../../service/empleado.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-nuevoempleado',
  templateUrl: './nuevoempleado.component.html',
  styleUrls: ['./nuevoempleado.component.css']
})
export class NuevoempleadoComponent implements OnInit {
  date:Date=new Date();
  hide = true;
  logging:boolean=true
  cargos:Cargo[]=[];
  constructor(private cargoService:CargoService,
              private empleadoService:EmpleadoService,
              private _snackBar: MatSnackBar,
              private router:Router,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Nuevo Empleado")
    try {
      if (JSON.parse(sessionStorage['user']).usuario?.rol == "EMPLEADO" && JSON.parse(sessionStorage['user']).id != null) {
        this.cargoService.getcargoAll().subscribe(value => {
          this.cargos=value;
          this.logging=false;
        },error => {
          this.logging=false;
        })
      }else {
        this.router.navigate(['/inicio/home'])
      }
    }catch (e){
      this.router.navigate(['/inicio/home'])
    }
  }

  profileFormUsuario = new FormGroup({
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
    usuario.rol="EN";
    var empleado:Empleado = this.profileFormUsuario.getRawValue();
    empleado.usuario=usuario;
    empleado.estado=true;
    this.empleadoService.postEmpleado(empleado).subscribe(value => {
      this._snackBar.open("Empleado creado correctamente", "",{
        duration: 1 * 2000,
      });
      this.router.navigate(['/inicio/verempledos'])
    },error => {
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })

  }

}
