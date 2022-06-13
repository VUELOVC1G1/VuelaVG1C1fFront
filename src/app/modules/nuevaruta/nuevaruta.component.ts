import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {RutasService} from "../../service/rutas.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Usuario} from "../../models/usuario";
import {Empleado} from "../../models/empleado";

@Component({
  selector: 'app-nuevaruta',
  templateUrl: './nuevaruta.component.html',
  styleUrls: ['./nuevaruta.component.css']
})
export class NuevarutaComponent implements OnInit {

  filteredOptions?: Observable<string[]>;
  filteredOptions1?: Observable<string[]>;

  firstFormGroup = new FormGroup({
    origen: new FormControl('', [Validators.required]),
    destino: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });
  constructor(private rutasService:RutasService,
              private _snackBar: MatSnackBar,
              private router :Router) { }

  ngOnInit(): void {
    this.filteredOptions = this.firstFormGroup.get("origen")!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.filteredOptions1 = this.firstFormGroup.get("destino")!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  guardarRutas(){
    this.rutasService.postRutas(this.firstFormGroup.getRawValue()).subscribe(value => {
      this._snackBar.open("Ruta creado correctamente", "", {
        duration: 1 * 2000,
      });
      this.router.navigate(["/inicio/verrutas"])
    }, error => {
      this._snackBar.open(error.error.message, "", {
        duration: 1 * 2000,
      });
    })
  }


  options: string[] = ['Azuay', 'Bolívar', 'Cañar',
    'Carchi','Chimborazo','Cotopaxi','El Oro','Esmeraldas','Galápagos','Guayas'
    ,'Imbabura','Loja','Los Ríos','Manabí','Morona-Santiago','Napo','Orellana','Pastaza'
    ,'Pichincha','Santa Elena','Santo Domingo de los Tsáchilas'
    ,'Sucumbíos','Tungurahua','Zamora-Chinchipe'];

}
