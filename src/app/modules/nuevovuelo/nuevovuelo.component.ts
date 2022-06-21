import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AvionService} from "../../service/avion.service";
import {Avion} from "../../models/avion";
import {RutasService} from "../../service/rutas.service";
import {Rutas} from "../../models/rutas";
import {HorarioService} from "../../service/horario.service";
import {Horario} from "../../models/horario";
import {TiposdevueloService} from "../../service/tiposdevuelo.service";
import {TiposVuelo, Vuelo} from "../../models/vuelo";
import {UsuariocharterService} from "../../service/usuariocharter.service";
import {Usuariocharter} from "../../models/usuariocharter";
import {VueloService} from "../../service/vuelo.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nuevovuelo',
  templateUrl: './nuevovuelo.component.html',
  styleUrls: ['./nuevovuelo.component.css']
})
export class NuevovueloComponent implements OnInit {

  aviones:Avion[]=[];
  rutas:Rutas[]=[];
  horarios:Horario[]=[];
  tiposvuelos:TiposVuelo[]=[];
  charter:Usuariocharter[]=[];
  vueloC:TiposVuelo=new TiposVuelo();

  firstFormGroup = this._formBuilder.group({
    avionid: ['', Validators.required],
    tipoVueloRequest: ['', Validators.required],
    ucharterResponse: [''],
    fechaVuelo: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    rutaRequest: ['', Validators.required],
    horarioRequest: ['', Validators.required],
    precio: ['', Validators.required],

  });
  thirtFormGroup = this._formBuilder.group({
    salaEspera:['', Validators.required],
    estado: ['', Validators.required],
    observacion: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder,
              private avionService:AvionService,
              private rutasService:RutasService,
              private hoariosService:HorarioService,
              private tiposdevueloService:TiposdevueloService,
              private usuariocharterService:UsuariocharterService,
              private vueloService:VueloService,
              private _snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit(): void {
    this.avionService.getAvionAll().subscribe(value => {
      this.aviones=value.filter(value1 => value1.estado==true);
    })
    this.rutasService.getRutasAll().subscribe(value => {
      this.rutas=value;
    })
    this.hoariosService.getHorariosAll().subscribe(value => {
      this.horarios=value;
    })
    this.tiposdevueloService.gettiposdevuelosAll().subscribe(value => {
      this.tiposvuelos=value;
      this.vueloC=this.tiposvuelos.filter(value1 => value1.nombre=="CHARTER")[0]
    })
    this.usuariocharterService.getCharterAll().subscribe(value => {
      this.charter=value;
    })
  }



  guardarVuelo(){
    var vuelo:Vuelo= new Vuelo();
    vuelo.avionid=this.firstFormGroup.getRawValue().avionid
    vuelo.tipoVueloRequest=this.firstFormGroup.getRawValue().tipoVueloRequest
    vuelo.fechaVuelo=this.firstFormGroup.getRawValue().fechaVuelo

    vuelo.rutaRequest=this.secondFormGroup.getRawValue().rutaRequest
    vuelo.horarioRequest=this.secondFormGroup.getRawValue().horarioRequest
    vuelo.precio=this.secondFormGroup.getRawValue().precio

    vuelo.estado=this.thirtFormGroup.getRawValue().estado
    vuelo.observacion=this.thirtFormGroup.getRawValue().observacion
    vuelo.salaEspera=this.thirtFormGroup.getRawValue().salaEspera

    vuelo.fechaCreacion= new Date();

    console.log(vuelo.avionid)

    if(vuelo.tipoVueloRequest?.nombre!="COMERCIAL"){
      vuelo.ucharterResponse=this.firstFormGroup.getRawValue().ucharterResponse
    }
    this.vueloService.postVuelo(vuelo).subscribe(value => {
      this._snackBar.open("Vuelo creado correctamente", "", {
        duration: 1 * 2000,
      });
      this.router.navigate(["/inicio/vervuelos"])
    }, error => {
      this._snackBar.open(error.error.message, "", {
        duration: 1 * 2000,
      });
    })

  }


  options: string[] = ['SALA-A1', 'SALA-A2', 'SALA-A3',
    'SALA-A4','SALA-A5','SALA-A6','SALA-B1','SALA-B2','SALA-B3','SALA-B4'
    ,'SALA-B5','SALA-B6'];

}
