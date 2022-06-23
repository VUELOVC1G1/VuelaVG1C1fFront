import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Solicitud} from "../../models/solicitud";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SolicitudService} from "../../service/solicitud.service";
import {Usuariocharter} from "../../models/usuariocharter";
import {UsuariocharterService} from "../../service/usuariocharter.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-versolitud-ao',
  templateUrl: './versolitud-ao.component.html',
  styleUrls: ['./versolitud-ao.component.css']
})
export class VersolitudAoComponent implements OnInit {

  logging:boolean=true
  usuario:Usuariocharter[]=[];

  displayedColumns: string[] = ['ruta', 'fecha', 'estado', 'eliminar', 'continuar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Solicitud>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private solicitudService: SolicitudService,
              private usuariocharterService:UsuariocharterService,
              private title: Title,
              private router:Router) {
  }

  ngOnInit(): void {
    this.title.setTitle("Ver Solicitud")
    try {
      if (JSON.parse(sessionStorage['user']).usuario?.rol == "EMPLEADO" && JSON.parse(sessionStorage['user']).id != null) {
        this.listarSolicides();
        this.usuariocharterService.getCharterAll().subscribe(value => {
          this.usuario=value;
        })
      }else {
        this.router.navigate(['/inicio/home'])
      }
    }catch (e){
      this.router.navigate(['/inicio/home'])
    }
  }

  listarSolicides() {
    this.solicitudService.getSolicitudAll().subscribe(value => {
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

  obtnerdatos(id?:Number):String{
    // @ts-ignore
    return "Ruc: "+this.usuario.filter(value => value.id==id).pop()?.ruc+"  Nombre: "+this.usuario.filter(value => value.id==id).pop()?.empresa;
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
