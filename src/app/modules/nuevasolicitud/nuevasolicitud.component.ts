import { Component, OnInit } from '@angular/core';
import {RutasService} from "../../service/rutas.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {SolicitudService} from "../../service/solicitud.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Solicitud} from "../../models/solicitud";

@Component({
  selector: 'app-nuevasolicitud',
  templateUrl: './nuevasolicitud.component.html',
  styleUrls: ['./nuevasolicitud.component.css']
})
export class NuevasolicitudComponent implements OnInit {

  constructor(private solicitudService:SolicitudService,
              private _snackBar: MatSnackBar,
              private router :Router) { }

  firstFormGroup = new FormGroup({
    ruta: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {

  }


  guardarSolictud(){
    var solcitud:Solicitud = this.firstFormGroup.getRawValue();
    solcitud.id_charter=JSON.parse(sessionStorage['user']).id;
    solcitud.estado=false;
    console.log(solcitud);
    this.solicitudService.postSolicitud(solcitud).subscribe(value => {
      this._snackBar.open("Solicitud enviada correctamente, espere una respuesta", "", {
        duration: 1 * 2000,
      });
    }, error => {
      this._snackBar.open(error.error.message, "", {
        duration: 1 * 2000,
      });
    })
  }

}
