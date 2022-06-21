import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Rutas} from "../../models/rutas";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RutasService} from "../../service/rutas.service";
import {PromocionService} from "../../service/promocion.service";
import {Promocion} from "../../models/promocion";

@Component({
  selector: 'app-verpromociones',
  templateUrl: './verpromociones.component.html',
  styleUrls: ['./verpromociones.component.css']
})
export class VerpromocionesComponent implements OnInit {

  promociones:Promocion[]=[];

  displayedColumns: string[] = ['descuento', 'descripcion', 'vuelo','vuelo1','eliminar','editar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Promocion>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private promocionService:PromocionService) { }

  ngOnInit(): void {
    this.listarPromociones();
  }

  listarPromociones(){
    this.promocionService.getPromocionAll().subscribe(value => {
      this.dataSource = new MatTableDataSource(value.filter(value1 => value1.vuelo?.estado==true));
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
  eliminarpromocion(id:Number){
    this.promocionService.deletePromocion(id).subscribe(value => {
      this._snackBar.open("Ruta eliminado de forma exitosa", "",{
        duration: 1 * 2000,
      });
      this.listarPromociones();
    },error => {
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })
  }

}
