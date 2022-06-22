import { Component, OnInit } from '@angular/core';
import {RutasService} from "../../service/rutas.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VueloService} from "../../service/vuelo.service";
import {Avion} from "../../models/avion";
import {Rutas} from "../../models/rutas";
import {Horario} from "../../models/horario";
import {TiposVuelo, Vuelo} from "../../models/vuelo";
import {Usuariocharter} from "../../models/usuariocharter";
import {FormBuilder, Validators} from "@angular/forms";
import {AvionService} from "../../service/avion.service";
import {HorarioService} from "../../service/horario.service";
import {TiposdevueloService} from "../../service/tiposdevuelo.service";
import {UsuariocharterService} from "../../service/usuariocharter.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Cargo} from "../../models/cargo";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-editarvuelo',
  templateUrl: './editarvuelo.component.html',
  styleUrls: ['./editarvuelo.component.css']
})
export class EditarvueloComponent implements OnInit {

  logging:boolean=true

  aviones:Avion[]=[];
  rutas:Rutas[]=[];
  horarios:Horario[]=[];
  tiposvuelos:TiposVuelo[]=[];
  charter:Usuariocharter[]=[];
  vueloC:TiposVuelo=new TiposVuelo();

  firstFormGroup = this._formBuilder.group({
    id:[''],
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
    estado: ['', Validators.required],
    observacion: ['', Validators.required],
    salaEspera:['', Validators.required],
  });
  isLinear = false;
  char =false;

  constructor(private activatedRoute: ActivatedRoute,
              private vueloService:VueloService,
              private _formBuilder: FormBuilder,
              private avionService:AvionService,
              private rutasService:RutasService,
              private hoariosService:HorarioService,
              private tiposdevueloService:TiposdevueloService,
              private usuariocharterService:UsuariocharterService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Editar Vuelo")
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
    this.activatedRoute.params.subscribe(params => {
      this.vueloService.getVuelo(params['id']).subscribe(value => {
        this.logging=false;
        this.char=(value.tipoVueloResponse?.nombre=="CHARTER")?true:false;
        this.firstFormGroup.setValue({
          id: value.id,
          avionid: value.avionResponse?.id,
          tipoVueloRequest: value.tipoVueloResponse,
          ucharterResponse: value.ucharterResponse,
          fechaVuelo:value.fechaVuelo,
        })
        this.secondFormGroup.setValue({
          rutaRequest: value.rutaResponse,
          horarioRequest: value.horarioResponse,
          precio: value.precio
        })
        this.thirtFormGroup.setValue({
          estado: value.estado,
          observacion: value.observacion,
          salaEspera: value.salaEspera
        })
      },error => {
        this.logging=false;
      })
    })
  }

  public objectComparisonFunction = function( cargoDto:Cargo, value: { id: Number | undefined; } ) : boolean {
    return cargoDto.id === value.id;
  }

  actualizarVuelo(){
    var vuelo:Vuelo= new Vuelo();
    vuelo.id=this.firstFormGroup.getRawValue().id
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

    console.log(vuelo)

    if(vuelo.tipoVueloRequest?.nombre!="COMERCIAL"){
      vuelo.ucharterResponse=this.firstFormGroup.getRawValue().ucharterResponse
    }
    this.vueloService.putVuelo(vuelo).subscribe(value => {
      this._snackBar.open("Vuelo actualizado correctamente", "", {
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
