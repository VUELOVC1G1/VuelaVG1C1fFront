import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Vuelo} from "../../models/vuelo";
import {VueloService} from "../../service/vuelo.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Promocion} from "../../models/promocion";
import {PromocionService} from "../../service/promocion.service";
import {Asientos, TipoAsiento} from "../../models/avion";
import {AvionService} from "../../service/avion.service";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode";
import {Boleto} from "../../models/boleto";
import {BoletoService} from "../../service/boleto.service";

@Component({
  selector: 'app-vuevotiket',
  templateUrl: './vuevotiket.component.html',
  styleUrls: ['./vuevotiket.component.css']
})
export class VuevotiketComponent implements OnInit {
  vuelo: Vuelo = new Vuelo();
  promocion: Promocion = new Promocion();
  asientos?: Asientos[] = [];
  cargo?: boolean = false;
  rows?: FormArray;
  totaMaletas?:number;


  firstFormGroup = this._formBuilder.group({});
  secondFormGroup = this._formBuilder.group({
    id: ['', Validators.required],
    nombre: ['', Validators.required],
    precio: ['', Validators.required],
    tipoAsiento: ['', Validators.required],
    estado: ['', [Validators.required, Validators.pattern("true")]],
  });
  thisrFormGroup = this._formBuilder.group({});
  fourFormGroup = this._formBuilder.group({
    tipo: ['', Validators.required],
    valor: ['', Validators.required],
  });
  isLinear = true;

  constructor(private activatedRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private router: Router,
              private vueloService: VueloService,
              private promocionService: PromocionService,
              private _formBuilder: FormBuilder,
              private avionService: AvionService,
              private boletoService:BoletoService) {
    //ArrayActividades
    this.rows = this._formBuilder.array([]);
  }

  ngOnInit(): void {
    this.onAddRow();
    try {
      if (JSON.parse(sessionStorage['user']).usuario?.rol == "PASAJERO" && JSON.parse(sessionStorage['user']).id != null) {
        this.activatedRoute.params.subscribe(params => {
          console.log(params['id'])
          this.vueloService.getVuelo(params['id']).subscribe(value => {
            this.vuelo = value;
            this.avionService.getAvionAll().subscribe(value1 => {
              this.asientos = value1.filter(value2 => value2.id == value.avionResponse?.id)[0].asientos;
            })
          })
          this.promocionService.getPromocionAll().subscribe(value => {
            if(value.filter(value1 => value1.vuelo?.id == params['id']).length==0){
              this.promocion= new Promocion()
            }else {
              this.promocion = value.filter(value1 => value1.vuelo?.id == params['id'])[0]
            }

          })
        })
      } else {
        this._snackBar.open("Debe iniciar sesión como usuario comercial para comprar un boleto", "ACEPTAR",);
        this.router.navigate(['/inicio/inicarsesion'])
      }
    } catch (e) {
      this._snackBar.open("Debe iniciar sesión como usuario comercial para comprar un boleto", "ACEPTAR",);
      this.router.navigate(['/inicio/inicarsesion'])
    }
    // @ts-ignore
    this.thisrFormGroup.get("items_value")?.setValue("yes");
    // @ts-ignore
    this.thisrFormGroup.addControl('rows', this.rows);
  }

  estadoAsineto(aseinto: Asientos) {
    this.cargo = true;
    this.vueloService.getEstadoAsiento(this.vuelo.id, aseinto.id).subscribe(value => {
      this.secondFormGroup.setValue({
        id: aseinto.id,
        nombre: aseinto.nombre,
        precio: aseinto.precio,
        tipoAsiento: aseinto.tipoAsiento,
        estado: value,
      })
      this.cargo = false;
      this.preciofinal()
    })
  }

  onAddRow() {
    this.totaMaletas = 0;
    this.rows?.push(this.createItemFormGroup());
    this.rows?.getRawValue().forEach(element => {
      this.totaMaletas+=element.precio;
      // console.log(this.sum)
    })
    this.preciofinal()
  }

  onRemoveRow(rowIndex: number) {
    this.totaMaletas = 0;
    this.rows?.removeAt(rowIndex);
    this.rows?.getRawValue().forEach(element => {
      this.totaMaletas+=element.precio;
    })
    this.preciofinal()
  }

  createItemFormGroup(): FormGroup {
    return this._formBuilder.group({
      peso: ['', Validators.required],
      precio: ['', Validators.required],
    })
  }

  sumar(id:number){
    this.totaMaletas = 0;
    this.rows?.getRawValue().forEach((value, index) => {
      this.rows?.at(index).setValue({
        peso:value.peso,
        precio:Number(value.peso)*0.50
      })
    })
    this.rows?.getRawValue().forEach(element => {
      this.totaMaletas+=element.precio;
    })
    this.preciofinal()
  }

  private boleto:Boleto= new Boleto();
  gurdarvuelo(){
    var asiento:Asientos[]=[];
    asiento.push(this.secondFormGroup.getRawValue())
    this.boleto.qr=""
    this.boleto.fecha=new Date();
    this.boleto.maletas=this.rows?.getRawValue();
    this.boleto.pasajeroId=JSON.parse(sessionStorage['user']).id;
    this.boleto.vueloId=this.vuelo.id;
    this.boleto.asientos=asiento;
    this.boleto.pago=this.fourFormGroup.getRawValue();
    // @ts-ignore
    this.boleto.pago.estado==true;
    console.log( this.boleto);
    this.boletoService.postBoleto(this.boleto).subscribe(value => {
      this._snackBar.open("Boleto obtenido, que tenga un buen viaje", "",{
        duration: 1 * 2000,
      });
      this.router.navigate(['/inicio/verbolestos',this.boleto.pasajeroId])
    },error => {
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })
  }

  preciofinal(){
    // @ts-ignore
    var a:number = this.totaMaletas+this.vuelo?.precio+this.secondFormGroup.getRawValue().precio;
    var b:number;
    if(this.promocion.id!=null){
      b=a*Number(this.promocion.descuento)/100;
      // @ts-ignore
      a=this.totaMaletas+this.vuelo?.precio+this.secondFormGroup.getRawValue().precio-b;
    }
    this.fourFormGroup.setValue({
      tipo: '',
      // @ts-ignore
      valor:  a
    })
  }
}
