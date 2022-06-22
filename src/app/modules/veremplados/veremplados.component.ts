import {Component, OnInit, ViewChild} from '@angular/core';
import {EmpleadoService} from "../../service/empleado.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Empleado} from "../../models/empleado";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-veremplados',
  templateUrl: './veremplados.component.html',
  styleUrls: ['./veremplados.component.css']
})
export class VerempladosComponent implements OnInit {

  logging:boolean=true

  displayedColumns: string[] = ['cedula', 'nombre', 'apellido','nombrec','eliminar','editar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Empleado>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private empleadoService:EmpleadoService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listarHoarios();

  }

  listarHoarios(){
    this.empleadoService.getEmpleadoAll().subscribe(value => {
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


  eliminaremplado(id:Number){
    this.empleadoService.deleteEmpleado(id).subscribe(value => {
      this._snackBar.open("Empleado eliminado de forma exitosa", "",{
        duration: 1 * 2000,
      });
      this.listarHoarios();
    },error => {
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })
  }

}
