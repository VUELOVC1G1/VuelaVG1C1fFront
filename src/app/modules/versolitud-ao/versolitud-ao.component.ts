import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Solicitud} from "../../models/solicitud";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SolicitudService} from "../../service/solicitud.service";
import {Usuariocharter} from "../../models/usuariocharter";
import {UsuariocharterService} from "../../service/usuariocharter.service";

@Component({
  selector: 'app-versolitud-ao',
  templateUrl: './versolitud-ao.component.html',
  styleUrls: ['./versolitud-ao.component.css']
})
export class VersolitudAoComponent implements OnInit {

  displayedColumns: string[] = ['ruta', 'fecha', 'estado', 'eliminar', 'continuar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Solicitud>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private solicitudService: SolicitudService,
              private usuariocharterService:UsuariocharterService) {
  }

  ngOnInit(): void {
    this.listarSolicides();
  }

  listarSolicides() {
    this.solicitudService.getSolicitudAll().subscribe(value => {
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

  aceptarsolicitar(solicitud: Solicitud) {
    solicitud.estado = true;
    solicitud.id_charter = solicitud.charterId;
    console.log(solicitud)
    this.solicitudService.putSolicitud(solicitud).subscribe(value => {
      this._snackBar.open("Solicitud aceptada", "", {
        duration: 1 * 2000,
      });
    }, error => {
      this._snackBar.open(error.error.message, "", {
        duration: 1 * 2000,
      });
    })
  }


  denagarsolicitar(solicitud: Solicitud) {
    solicitud.estado = false;
    solicitud.id_charter = solicitud.charterId;
    console.log(solicitud)
    this.solicitudService.putSolicitud(solicitud).subscribe(value => {
      this._snackBar.open("Solicitud aceptada", "", {
        duration: 1 * 2000,
      });
    }, error => {
      this._snackBar.open(error.error.message, "", {
        duration: 1 * 2000,
      });
    })
  }

}
