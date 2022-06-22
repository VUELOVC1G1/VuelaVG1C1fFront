import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Rutas} from "../../models/rutas";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RutasService} from "../../service/rutas.service";
import {Solicitud} from "../../models/solicitud";
import {SolicitudService} from "../../service/solicitud.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-versolicitud-cha',
  templateUrl: './versolicitud-cha.component.html',
  styleUrls: ['./versolicitud-cha.component.css']
})
export class VersolicitudChaComponent implements OnInit {

  logging:boolean=true
  displayedColumns: string[] = ['ruta', 'fecha', 'estado','eliminar','continuar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Solicitud>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private solicitudService:SolicitudService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.listarSolicides(params['id']);
    })
  }

  listarSolicides(id:Number){
    this.solicitudService.getSolicitudAll().subscribe(value => {
      this.logging=false;
      console.log(value)
      this.dataSource = new MatTableDataSource(value.filter(value1 => value1.charterId==id));
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
  eliminarsolicitar(solicitud:Solicitud){
    if (solicitud?.id != null) {
      this.solicitudService.deleteRutas(solicitud.id).subscribe(value => {
        this._snackBar.open("Solicidud eliminada de forma exitosa", "", {
          duration: 1 * 2000,
        });
        if (solicitud?.charterId != null) {
          this.listarSolicides(solicitud.charterId)
        }
      }, error => {
        this._snackBar.open(error.error.message, "", {
          duration: 1 * 2000,
        });
      })
    }
  }
}
