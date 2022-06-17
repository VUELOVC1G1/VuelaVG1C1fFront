import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Vuelo} from "../../models/vuelo";
import {VueloService} from "../../service/vuelo.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Promocion} from "../../models/promocion";
import {PromocionService} from "../../service/promocion.service";
import {Asientos, TipoAsiento} from "../../models/avion";
import {AvionService} from "../../service/avion.service";

@Component({
  selector: 'app-vuevotiket',
  templateUrl: './vuevotiket.component.html',
  styleUrls: ['./vuevotiket.component.css']
})
export class VuevotiketComponent implements OnInit {
  vuelo:Vuelo = new Vuelo();
  promocion: Promocion = new Promocion();
  asientos?:Asientos[]=[];
  cargo?:boolean=false;

  firstFormGroup = this._formBuilder.group({

  });
  secondFormGroup = this._formBuilder.group({
    id:['', Validators.required],
    nombre:['', Validators.required],
    precio:['', Validators.required],
    tipoAsiento:['', Validators.required],
    estado:['', [Validators.required,Validators.pattern("true")]],
  });
  isLinear = true;

  constructor(private activatedRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private router:Router,
              private vueloService:VueloService,
              private promocionService:PromocionService,
              private _formBuilder: FormBuilder,
              private avionService:AvionService) { }
  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user']).usuario?.rol=="PASAJERO"&&JSON.parse(sessionStorage['user']).id!=null){
      this.activatedRoute.params.subscribe(params => {
        console.log(params['id'])
        this.vueloService.getVuelo(params['id']).subscribe(value => {
          this.vuelo=value;
          this.avionService.getAvionAll().subscribe(value1 => {
            this.asientos= value1.filter(value2 => value2.id==value.avionResponse?.id)[0].asientos;
          })
        })
        this.promocionService.getPromocionAll().subscribe(value => {
          this.promocion=value.filter(value1 => value1.vuelo?.id==params['id'])[0]
        })
      })
    }else {
      this._snackBar.open("Debe iniciar sesión como usuario comercial para comprar un boleto", "ACEPTAR",);
      this.router.navigate(['/inicio/inicarsesion'])
    }
  }

  estadoAsineto(aseinto:Asientos) {
    this.cargo=true;
    console.log(this.vuelo.id, aseinto.id)
    this.vueloService.getEstadoAsiento(this.vuelo.id, aseinto.id).subscribe(value => {
      this.secondFormGroup.setValue({
        id:aseinto.id,
        nombre:aseinto.nombre,
        precio:aseinto.precio,
        tipoAsiento:aseinto.tipoAsiento,
        estado:value,
      })
      this.cargo=false;
      console.log( this.secondFormGroup.getRawValue().estado)
    })
  }
}

