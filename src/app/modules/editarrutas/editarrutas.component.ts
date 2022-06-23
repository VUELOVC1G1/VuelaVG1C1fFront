import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RutasService} from "../../service/rutas.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-editarrutas',
  templateUrl: './editarrutas.component.html',
  styleUrls: ['./editarrutas.component.css']
})
export class EditarrutasComponent implements OnInit {
  filteredOptions?: Observable<string[]>;
  filteredOptions1?: Observable<string[]>;

  logging:boolean=true
  firstFormGroup = new FormGroup({
    id: new FormControl(''),
    origen: new FormControl('', [Validators.required]),
    destino: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });

  constructor(private activatedRoute: ActivatedRoute,
              private rutasService:RutasService,
              private _snackBar: MatSnackBar,
              private router :Router,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Editar Rutas")
    try {
      if (JSON.parse(sessionStorage['user']).usuario?.rol == "EMPLEADO" && JSON.parse(sessionStorage['user']).id != null) {
        this.filteredOptions = this.firstFormGroup.get("origen")!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
        this.filteredOptions1 = this.firstFormGroup.get("destino")!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter1(value || '')),
        );
        this.activatedRoute.params.subscribe(params => {
          this.rutasService.getRutas(params['id']).subscribe(value => {
            this.logging=false;
            this.firstFormGroup.setValue(value);
            console.log(value)
          },error => {
            this.logging=false;
          })
        })
      }else {
        this.router.navigate(['/inicio/home'])
      }
    }catch (e){
      this.router.navigate(['/inicio/home'])
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  actualizarRutas(){
    this.rutasService.putRutas(this.firstFormGroup.getRawValue()).subscribe(value => {
      this._snackBar.open("Rutas actualizada correctamente", "", {
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
