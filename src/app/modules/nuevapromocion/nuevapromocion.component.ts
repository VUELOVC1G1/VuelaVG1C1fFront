import { Component, OnInit } from '@angular/core';
import {PromocionService} from "../../service/promocion.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VueloService} from "../../service/vuelo.service";
import {Avion} from "../../models/avion";
import {Vuelo} from "../../models/vuelo";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nuevapromocion',
  templateUrl: './nuevapromocion.component.html',
  styleUrls: ['./nuevapromocion.component.css']
})
export class NuevapromocionComponent implements OnInit {

  logging:boolean=true
  vuelos:Vuelo[]=[];

  constructor(private promocionService:PromocionService,
              private vueloService:VueloService,
              private _snackBar: MatSnackBar,
              private router :Router) { }

  firstFormGroup = new FormGroup({
    vueloid: new FormControl('', [Validators.required]),
    descuento: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.vueloService.getVueloAll().subscribe(value => {
      this.logging=false;
      console.log(value.filter(value1 => value1.estado==true&&value1.tipoVueloResponse?.nombre=="COMERCIAL"))
      this.vuelos=value.filter(value1 => value1.estado==true&&value1.tipoVueloResponse?.nombre=="COMERCIAL")
    },error => {
      this.logging=false;
    })
  }

  guardarPromocion(){
    this.promocionService.postPromocion(this.firstFormGroup.getRawValue()).subscribe(value => {
      this._snackBar.open("Promoción creado correctamente", "", {
        duration: 1 * 2000,
      });
      this.router.navigate(['/inicio/verpromociones'])
    }, error => {
      this._snackBar.open(error.error.message, "", {
        duration: 1 * 2000,
      });
    })
  }

}
