import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Mafiniesto} from "../../models/mafiniesto";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HorarioService} from "../../service/horario.service";
import {ActivatedRoute} from "@angular/router";
import {ManifiestoService} from "../../service/manifiesto.service";

@Component({
  selector: 'app-vermanifiesto-ja',
  templateUrl: './vermanifiesto-ja.component.html',
  styleUrls: ['./vermanifiesto-ja.component.css']
})
export class VermanifiestoJaComponent implements OnInit {


  id?:Number;

  displayedColumns: string[] = ['charter','charter1','documento','eliminar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Mafiniesto>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private horarioService:HorarioService,
              private activatedRoute: ActivatedRoute,
              private manifiestoService:ManifiestoService) { }


  ngOnInit(): void {
      this.listarManifiesto()
  }

  listarManifiesto(){
    this.manifiestoService.getManifiestoAll().subscribe(value => {
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

  createPdf(documento: String) {
    debugBase64(documento)
  }
}
function debugBase64(documento: String){
  var win = window.open();
  win?.document.write('<iframe src="' + documento  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}
