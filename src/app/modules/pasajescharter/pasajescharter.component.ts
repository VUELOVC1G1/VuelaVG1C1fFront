import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Vuelo} from "../../models/vuelo";
import {Promocion} from "../../models/promocion";
import {Asientos} from "../../models/avion";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VueloService} from "../../service/vuelo.service";
import {PromocionService} from "../../service/promocion.service";
import {AvionService} from "../../service/avion.service";
import {BoletoService} from "../../service/boleto.service";
import {Boleto} from "../../models/boleto";
import {Usuario} from "../../models/usuario";
import {Pasajero} from "../../models/pasajero";
import {PasajeroService} from "../../service/pasajero.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-pasajescharter',
  templateUrl: './pasajescharter.component.html',
  styleUrls: ['./pasajescharter.component.css']
})
export class PasajescharterComponent implements OnInit {
  logging:boolean=true

  vuelo: Vuelo = new Vuelo();
  promocion: Promocion = new Promocion();
  asientos?: Asientos[] = [];
  cargo?: boolean = false;
  rows?: FormArray;
  totaMaletas?:number;

  firstFormGroup = this._formBuilder.group({
    cedula: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    nombre: new FormControl('',[Validators.required]),
    apellido: new FormControl('',[Validators.required]),
    correo: new FormControl('',[Validators.required, Validators.email]),
  });
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

  constructor(private _formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private router: Router,
              private vueloService: VueloService,
              private promocionService: PromocionService,
              private avionService: AvionService,
              private boletoService:BoletoService,
              private pasajeroService:PasajeroService,
              private title: Title) {
    //ArrayActividades
    this.rows = this._formBuilder.array([]);
  }

  ngOnInit(): void {
    this.title.setTitle("Pasajero Charter")
    try {
      if (JSON.parse(sessionStorage['user']).usuario?.rol == "EMPLEADO" && JSON.parse(sessionStorage['user']).id != null) {
        this.activatedRoute.params.subscribe(params => {
          console.log(params['id'])
          this.vueloService.getVuelo(params['id']).subscribe(value => {
            this.logging=false;
            this.vuelo = value;
            this.avionService.getAvionAll().subscribe(value1 => {
              this.asientos = value1.filter(value2 => value2.id == value.avionResponse?.id)[0].asientos;
            })
          },error => {
            this.logging=false;
          })
          this.promocionService.getPromocionAll().subscribe(value => {
            if(value.filter(value1 => value1.vuelo?.id == params['id']).length==0){
              this.promocion= new Promocion()
            }else {
              this.promocion = value.filter(value1 => value1.vuelo?.id == params['id'])[0]
            }

          })
        })
        // @ts-ignore
        this.thisrFormGroup.get("items_value")?.setValue("yes");
        // @ts-ignore
        this.thisrFormGroup.addControl('rows', this.rows);
      }else {
        this.router.navigate(['/inicio/home'])
      }
    }catch (e){
      this.router.navigate(['/inicio/home'])
    }

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
    var usuario: Usuario = new Usuario();
    usuario.correo=this.firstFormGroup.getRawValue().correo;
    usuario.rol="CO";
    usuario.password=this.firstFormGroup.getRawValue().cedula;
    var pasajero:Pasajero = this.firstFormGroup.getRawValue();
    pasajero.usuario=usuario;
    this.pasajeroService.postPasajero(pasajero).subscribe(value => {
      var asiento:Asientos[]=[];
      asiento.push(this.secondFormGroup.getRawValue())
      this.boleto.qr=""
      this.boleto.fecha=new Date();
      this.boleto.maletas=this.rows?.getRawValue();
      this.boleto.pasajeroId=value.id;
      this.boleto.vueloId=this.vuelo.id;
      this.boleto.asientos=asiento;
      this.boleto.pago=this.fourFormGroup.getRawValue();
      // @ts-ignore
      this.boleto.pago?.estado=true;
      console.log( this.boleto);
      this.boletoService.postBoleto(this.boleto).subscribe(value => {
        this._snackBar.open("Pasajero guerdado correctamente", "",{
          duration: 1 * 2000,
        });
        this.router.navigate(['/inicio/vervueloscharter'])
      },error => {
        this._snackBar.open(error.error.message, "",{
          duration: 1 * 2000,
        });
      })
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
