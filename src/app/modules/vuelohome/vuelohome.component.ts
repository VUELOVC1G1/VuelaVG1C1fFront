import {Component, OnInit} from '@angular/core';
import {map, Observable, startWith} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Vuelo} from "../../models/vuelo";
import {VueloService} from "../../service/vuelo.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-vuelohome',
  templateUrl: './vuelohome.component.html',
  styleUrls: ['./vuelohome.component.css']
})
export class VuelohomeComponent implements OnInit {

  logging:boolean=true

  vuelos: Vuelo[] = []

  constructor(private vueloService: VueloService,
              private title: Title) {
  }

  filteredOptions?: Observable<string[]>;
  filteredOptions1?: Observable<string[]>;

  firstFormGroup = new FormGroup({
    origen: new FormControl('', [Validators.required]),
    destino: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.title.setTitle("Buscar vuelos")
    setTimeout(() => {
      this.logging=false;
    }, 1000)
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

  cambiarbusqueda() {
    var a = this.firstFormGroup.getRawValue().origen;
    var b = this.firstFormGroup.getRawValue().destino;

    this.firstFormGroup.setValue({
      origen: b,
      destino: a
    })
    console.log(this.firstFormGroup.getRawValue())
  }

  buscarvuelo() {
    this.vueloService.getVueloAll().subscribe(value => {
      this.vuelos=value.filter(value1 => value1.estado==true&&
        value1.tipoVueloResponse?.nombre=="COMERCIAL"&&
        value1.rutaResponse?.origen==this.firstFormGroup.getRawValue().origen&&
        value1.rutaResponse?.destino==this.firstFormGroup.getRawValue().destino)
    })
  }


  options: string[] = ['Azuay', 'Bol??var', 'Ca??ar',
    'Carchi', 'Chimborazo', 'Cotopaxi', 'El Oro', 'Esmeraldas', 'Gal??pagos', 'Guayas'
    , 'Imbabura', 'Loja', 'Los R??os', 'Manab??', 'Morona-Santiago', 'Napo', 'Orellana', 'Pastaza'
    , 'Pichincha', 'Santa Elena', 'Santo Domingo de los Ts??chilas'
    , 'Sucumb??os', 'Tungurahua', 'Zamora-Chinchipe'];

}
