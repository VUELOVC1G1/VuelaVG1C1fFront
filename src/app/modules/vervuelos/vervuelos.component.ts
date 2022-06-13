import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Empleado} from "../../models/empleado";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AvionService} from "../../service/avion.service";
import {Avion} from "../../models/avion";

@Component({
  selector: 'app-vervuelos',
  templateUrl: './vervuelos.component.html',
  styleUrls: ['./vervuelos.component.css']
})
export class VervuelosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'marca', 'placa','clase1','eliminar','editar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Avion>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private avionService:AvionService) { }

  ngOnInit(): void {
    this.listarevuelos();
  }

  listarevuelos(){
    this.avionService.getAvionAll().subscribe(value => {
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
