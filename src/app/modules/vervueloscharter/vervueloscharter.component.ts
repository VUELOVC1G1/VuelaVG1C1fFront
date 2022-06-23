import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Avion} from "../../models/avion";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VueloService} from "../../service/vuelo.service";
import {Vuelo} from "../../models/vuelo";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vervueloscharter',
  templateUrl: './vervueloscharter.component.html',
  styleUrls: ['./vervueloscharter.component.css']
})
export class VervueloscharterComponent implements OnInit {

  logging:boolean=true

  displayedColumns: string[] = ['fechaVuelo', 'rutaResponse', 'tipoVueloResponse','avionResponse','editar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Vuelo>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _snackBar: MatSnackBar,
              private vueloService:VueloService,
              private title: Title,
              private router:Router) { }

  ngOnInit(): void {
    this.title.setTitle("Ver Vuelos")
    try {
      if (JSON.parse(sessionStorage['user']).usuario?.rol == "EMPLEADO" && JSON.parse(sessionStorage['user']).id != null) {

        this.listarevuelos();

      }else {
        this.router.navigate(['/inicio/home'])
      }
    }catch (e){
      this.router.navigate(['/inicio/home'])
    }
  }
  listarevuelos(){
    this.vueloService.getVueloAll().subscribe(value => {
      this.logging=false;
      // @ts-ignore
      this.dataSource = new MatTableDataSource(value.filter(value1 => value1.tipoVueloResponse?.nombre=="CHARTER"&&value1.estado==true));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },error => {
      this.logging=false;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
