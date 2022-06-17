import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Horario} from "../../models/horario";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HorarioService} from "../../service/horario.service";
import {BoletoService} from "../../service/boleto.service";
import {Boleto} from "../../models/boleto";
import {ActivatedRoute} from "@angular/router";
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-verboletos',
  templateUrl: './verboletos.component.html',
  styleUrls: ['./verboletos.component.css']
})
export class VerboletosComponent implements OnInit {

  id?:Number;

  displayedColumns: string[] = ['asientos','asientos1', 'vuelo0','vuelo','vuelo1','eliminar','editar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Boleto>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private boletoService:BoletoService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.listar(params['id'])
      this.id=params['id'];
    })
  }

  listar(id?:Number){
    this.boletoService.getBoletoAll(id).subscribe(value => {
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
  cancelaruelo(id:Number){
    this.boletoService.deleteBoleto(id).subscribe(value => {
      this._snackBar.open("Ruta eliminado de forma exitosa", "",{
        duration: 1 * 2000,
      });
      this.listar(this.id);
    },error => {
      this._snackBar.open(error.error.message, "",{
        duration: 1 * 2000,
      });
    })
  }


  //QR
  elementType=NgxQrcodeElementTypes.URL;
  errorCorrectionLevel=NgxQrcodeErrorCorrectionLevels.HIGH;
  value="https://www.youtube.com/";
  //END QR

  async createPdf() {
    const pdfDefinition: any = {
      content: [
        ' sdfsdfdsf'
      ]
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }



}
