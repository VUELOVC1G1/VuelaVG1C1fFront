import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HorarioService} from "../../service/horario.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PromocionService} from "../../service/promocion.service";
import {Vuelo} from "../../models/vuelo";
import {VueloService} from "../../service/vuelo.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-editarpromocion',
  templateUrl: './editarpromocion.component.html',
  styleUrls: ['./editarpromocion.component.css']
})
export class EditarpromocionComponent implements OnInit {

  logging:boolean=true
  vuelos:Vuelo[]=[];
  constructor(private promocionService:PromocionService,
              private activatedRoute: ActivatedRoute,
              private vueloService:VueloService,
              private _snackBar: MatSnackBar,
              private router:Router,
              private title: Title) { }

  firstFormGroup = new FormGroup({
    id: new FormControl(''),
    vueloid: new FormControl('', [Validators.required]),
    descuento: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.title.setTitle("Editar Promoción")
    this.vueloService.getVueloAll().subscribe(value => {
      this.vuelos=value.filter(value1 => value1.estado==true&&value1.tipoVueloResponse?.nombre=="COMERCIAL")
    })
    this.activatedRoute.params.subscribe(params => {
      this.promocionService.getPromocion(params['id']).subscribe(value => {
        this.logging=false;
        this.firstFormGroup.setValue({
          id:value.id,
          vueloid:value.vuelo?.id,
          descuento:value.descuento,
          descripcion:value.descripcion
        })
      },error => {
        this.logging=false;
      })
    })
  }

  actualizarPromocion(){
    this.promocionService.putPromocion(this.firstFormGroup.getRawValue()).subscribe(value => {
      this._snackBar.open("Promoción actualizada correctamente", "", {
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
