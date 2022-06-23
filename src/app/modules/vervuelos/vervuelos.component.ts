import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Empleado} from "../../models/empleado";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AvionService} from "../../service/avion.service";
import {Avion} from "../../models/avion";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vervuelos',
  templateUrl: './vervuelos.component.html',
  styleUrls: ['./vervuelos.component.css']
})
export class VervuelosComponent implements OnInit {
  logging:boolean=true
  displayedColumns: string[] = ['nombre', 'marca', 'placa','clase1','eliminar','editar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Avion>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private avionService:AvionService,
              private title: Title,
              private router:Router) { }

  ngOnInit(): void {
    this.title.setTitle("Ver vuelos")
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
    this.avionService.getAvionAll().subscribe(value => {
      this.logging=false;
      this.dataSource = new MatTableDataSource(value);
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
  eliminaravion(id:Number){
    this.avionService.deleteAvion(id).subscribe(value => {
      this._snackBar.open("Empleado eliminado de forma exitosa", "",{
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
