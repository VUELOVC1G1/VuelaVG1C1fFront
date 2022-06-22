import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmpleadoService} from "../../service/empleado.service";
import {CargoService} from "../../service/cargo.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AvionService} from "../../service/avion.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Asientos, Avion} from "../../models/avion";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-editaraviones',
  templateUrl: './editaraviones.component.html',
  styleUrls: ['./editaraviones.component.css']
})
export class EditaravionesComponent implements OnInit {

  logging:boolean=true
  primera?: Number;
  segunda?: Number;
  tercera?: Number;
  isLinear = true;
  asientos?:Asientos[]=[];
  constructor(private activatedRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private router:Router,
              private avionService:AvionService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Editar Avion")
    this.activatedRoute.params.subscribe(params => {
      this.avionService.getAvionAll().subscribe(value => {
        this.logging=false;
        this.asientos= value.filter(value1 => value1.id==params['id'])[0].asientos;
        console.log(this.asientos?.length)
        // @ts-ignore
        this.primera= value.filter(value1 => value1.id==params['id'])[0].asientos.filter(value1 => value1.nombre=="Asientop1")[0].precio
        // @ts-ignore
        this.segunda= value.filter(value1 => value1.id==params['id'])[0].asientos.filter(value1 => value1.nombre=="Asientob1")[0].precio
        // @ts-ignore
        this.tercera= value.filter(value1 => value1.id==params['id'])[0].asientos.filter(value1 => value1.nombre=="Asientoe1")[0].precio
        this.firstFormGroup.setValue({
          id:value.filter(value1 => value1.id==params['id'])[0].id,
          nombre:value.filter(value1 => value1.id==params['id'])[0].nombre,
          marca:value.filter(value1 => value1.id==params['id'])[0].marca,
          modelo:value.filter(value1 => value1.id==params['id'])[0].modelo,
          placa:value.filter(value1 => value1.id==params['id'])[0].placa,
          estado:value.filter(value1 => value1.id==params['id'])[0].estado,
          wifi:value.filter(value1 => value1.id==params['id'])[0].wifi,
        })
      },error => {
        this.logging=false;
      })
    })
  }

  firstFormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    placa: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    wifi: new FormControl('', [Validators.required]),
  });
  secondFormGroup = new FormGroup({

  });
  thirdFormGroup = new FormGroup({
    primera: new FormControl('', [Validators.required]),
    segunda: new FormControl('', [Validators.required]),
    tercera: new FormControl('', [Validators.required]),
  });

  actualizarAvion(){
    var avion:Avion=this.firstFormGroup.getRawValue();
    // @ts-ignore
    this.asientos.filter((value, index) => {
      if(value.tipoAsiento?.nombre=="CLASE PREMIUM"){
        // @ts-ignore
        this.asientos[index].precio=this.thirdFormGroup.getRawValue().primera;
      }
      if(value.tipoAsiento?.nombre=="CLASE BUSINESS"){
        // @ts-ignore
        this.asientos[index].precio=this.thirdFormGroup.getRawValue().segunda;
      }
      if(value.tipoAsiento?.nombre=="CLASE ECONOMICA"){
        // @ts-ignore
        this.asientos[index].precio=this.thirdFormGroup.getRawValue().tercera;
      }
    })
    avion.asientos=this.asientos;


    this.avionService.putAvion(avion).subscribe(value => {
      this._snackBar.open("Avion actualizado correctamente", "", {
        duration: 1 * 2000,
      });
      this.router.navigate(["/inicio/veraviones"])
    }, error => {
      this._snackBar.open(error.error.message, "", {
        duration: 1 * 2000,
      });
    })
  }
}
