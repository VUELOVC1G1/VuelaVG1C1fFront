import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TipoasientosService} from "../../service/tipoasientos.service";
import {Asientos, Avion, TipoAsiento} from "../../models/avion";
import {AvionService} from "../../service/avion.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nuevoaviones',
  templateUrl: './nuevoaviones.component.html',
  styleUrls: ['./nuevoaviones.component.css']
})
export class NuevoavionesComponent implements OnInit {


  tipo?: String;
  isLinear = true;

  constructor(private _formBuilder: FormBuilder,
              private tipoasientosService: TipoasientosService,
              private avionService: AvionService,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  firstFormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    placa: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    wifi: new FormControl('', [Validators.required]),
  });
  secondFormGroup = new FormGroup({
    secondCtrl: new FormControl('', [Validators.required]),
  });
  thirdFormGroup = new FormGroup({
    primera: new FormControl('', [Validators.required]),
    segunda: new FormControl('', [Validators.required]),
    tercera: new FormControl('', [Validators.required]),
  });

  guardarAvion() {
    var a = 0;
    var b = 0;
    var c = 0
    this.tipoasientosService.gettipsoasientosAll().subscribe(value => {
      var asientos: Asientos[] = [];
      if (this.tipo == "TIPO1") {
        a = 4;
        b = 6;
        c = 24
      }
      if (this.tipo == "TIPO2") {
        a = 4;
        b = 3;
        c = 37
      }
      if (this.tipo == "TIPO3") {
        a = 6;
        b = 6;
        c = 29;
      }
      for (let i = 1; i <= a; i++) {
        var asiento = new Asientos();
        asiento.nombre = 'Asientop' + i;
        asiento.precio = this.thirdFormGroup.getRawValue().primera;
        asiento.tipoAsiento = value.filter(value1 => value1.nombre == "CLASE PREMIUM")[0];
        asientos.push(asiento)
      }
      for (let i = 1; i <= b; i++) {
        var asiento = new Asientos();
        asiento.nombre = 'Asientob' + i;
        asiento.precio = this.thirdFormGroup.getRawValue().segunda;
        asiento.tipoAsiento = value.filter(value1 => value1.nombre == "CLASE BUSINESS")[0];
        asientos.push(asiento)
      }
      for (let i = 1; i <= c; i++) {
        var asiento = new Asientos();
        asiento.nombre = 'Asientoe' + i;
        asiento.precio = this.thirdFormGroup.getRawValue().tercera;
        asiento.tipoAsiento = value.filter(value1 => value1.nombre == "CLASE ECONOMICA")[0];
        asientos.push(asiento)
      }
      var avion: Avion = this.firstFormGroup.getRawValue();
      avion.asientos = asientos;
      console.log(avion)
      this.avionService.postAvion(avion).subscribe(value => {
        this._snackBar.open("Avion creado correctamente", "", {
          duration: 1 * 2000,
        });
        this.router.navigate(["/inicio/veraviones"])
      }, error => {
        this._snackBar.open(error.error.message, "", {
          duration: 1 * 2000,
        });
      })
    })

  }


}
