import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Avion} from "../../models/avion";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AvionService} from "../../service/avion.service";
import {VueloService} from "../../service/vuelo.service";
import {Vuelo} from "../../models/vuelo";

@Component({
  selector: 'app-veraviones',
  templateUrl: './veraviones.component.html',
  styleUrls: ['./veraviones.component.css']
})
export class VeravionesComponent implements OnInit {


  displayedColumns: string[] = ['fechaVuelo', 'rutaResponse', 'tipoVueloResponse','avionResponse','eliminar','editar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Avion>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _snackBar: MatSnackBar,
              private vueloService:VueloService) { }

  ngOnInit(): void {
   this.listarevuelos();
  }
  listarevuelos(){
    this.vueloService.getVueloAll().subscribe(value => {
      console.log(value[0].tipoVueloRequest)
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarVuelo(id:Number){
    this.vueloService.deleteVuelo(id).subscribe(value => {
      this._snackBar.open("Vuelo eliminado de forma exitosa", "",{
        duration: 1 * 2000,
      });
      this.listarevuelos();
    },error => {
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })
  }

}
