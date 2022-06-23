import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Avion} from "../../models/avion";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AvionService} from "../../service/avion.service";
import {RutasService} from "../../service/rutas.service";
import {Rutas} from "../../models/rutas";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-verrutas',
  templateUrl: './verrutas.component.html',
  styleUrls: ['./verrutas.component.css']
})
export class VerrutasComponent implements OnInit {

  logging:boolean=true
  displayedColumns: string[] = ['origen', 'destino', 'descripcion','eliminar','editar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Rutas>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private rutasService:RutasService,
              private title: Title,
              private router:Router) { }

  ngOnInit(): void {
    this.title.setTitle("Ver Rutas")
    try {
      if (JSON.parse(sessionStorage['user']).usuario?.rol == "EMPLEADO" && JSON.parse(sessionStorage['user']).id != null) {

        this.listarRutas()

      }else {
        this.router.navigate(['/inicio/home'])
      }
    }catch (e){
      this.router.navigate(['/inicio/home'])
    }

  }

  listarRutas(){
    this.rutasService.getRutasAll().subscribe(value => {
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
    this.rutasService.deleteRutas(id).subscribe(value => {
      this._snackBar.open("Ruta eliminado de forma exitosa", "",{
        duration: 1 * 2000,
      });
      this.listarRutas();
    },error => {
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })
  }

}
