import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Horario} from "../../models/horario";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HorarioService} from "../../service/horario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Mafiniesto} from "../../models/mafiniesto";
import {ManifiestoService} from "../../service/manifiesto.service";
import {Boleto} from "../../models/boleto";
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-vermanifiesto-cha',
  templateUrl: './vermanifiesto-cha.component.html',
  styleUrls: ['./vermanifiesto-cha.component.css']
})
export class VermanifiestoChaComponent implements OnInit {
  logging:boolean=true
  id?:Number;

  displayedColumns: string[] = ['charter','documento','eliminar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Mafiniesto>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private horarioService:HorarioService,
              private activatedRoute: ActivatedRoute,
              private manifiestoService:ManifiestoService,
              private title: Title,
              private router:Router) { }


  ngOnInit(): void {
    this.title.setTitle("Ver Manifiesto")
    try {
      if (JSON.parse(sessionStorage['user']).usuario?.rol == "CHARTER" && JSON.parse(sessionStorage['user']).id != null) {

        this.activatedRoute.params.subscribe(params => {
          this.id=params['id']
          this.listarManifiesto(params['id'])
        })

      }else {
        this.router.navigate(['/inicio/home'])
      }
    }catch (e){
      this.router.navigate(['/inicio/home'])
    }
  }

  listarManifiesto(id?:Number){
    this.manifiestoService.getManifiestoAll().subscribe(value => {
      this.logging=false;
      this.dataSource = new MatTableDataSource(value.filter(value1 => value1.charterResponse?.id==id));
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

  eliminarManifiesto(id:Number){
    this.manifiestoService.deleteManifiesto(id).subscribe(value => {
      this._snackBar.open("Manifiesto eliminado de forma exitosa", "",{
        duration: 1 * 2000,
      });
      this.listarManifiesto(this.id);
    },error => {
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })
  }

  createPdf(documento: String) {
    debugBase64(documento)
  }

}
function debugBase64(documento: String){
  var win = window.open();
  win?.document.write('<iframe src="' + documento  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}


