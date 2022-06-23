import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Rutas} from "../../models/rutas";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RutasService} from "../../service/rutas.service";
import {HorarioService} from "../../service/horario.service";
import {Horario} from "../../models/horario";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-verhoarios',
  templateUrl: './verhoarios.component.html',
  styleUrls: ['./verhoarios.component.css']
})
export class VerhoariosComponent implements OnInit {

  logging:boolean=true
  displayedColumns: string[] = ['fechaInicio', 'fechaFin','eliminar','editar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Horario>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private horarioService:HorarioService,
              private activatedRoute: ActivatedRoute,
              private title: Title,
              private router:Router) { }


  ngOnInit(): void {
    this.title.setTitle("Ver Horarios")
    try {
      if (JSON.parse(sessionStorage['user']).usuario?.rol == "EMPLEADO" && JSON.parse(sessionStorage['user']).id != null) {
        this.listarHoriarios();

      }else {
        this.router.navigate(['/inicio/home'])
      }
    }catch (e){
      this.router.navigate(['/inicio/home'])
    }
  }

  listarHoriarios(){
    this.horarioService.getHorariosAll().subscribe(value => {
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

  eliminarhoarario(id:Number){
    this.horarioService.deleteHorarios(id).subscribe(value => {
      this._snackBar.open("Horario eliminado de forma exitosa", "",{
        duration: 1 * 2000,
      });
      this.listarHoriarios();
    },error => {
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })
  }

}
