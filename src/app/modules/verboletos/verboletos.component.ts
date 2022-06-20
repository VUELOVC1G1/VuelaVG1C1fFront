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
import html2canvas from "html2canvas";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-verboletos',
  templateUrl: './verboletos.component.html',
  styleUrls: ['./verboletos.component.css']
})
export class VerboletosComponent implements OnInit {

  id?: Number;

  displayedColumns: string[] = ['asientos', 'asientos1', 'vuelo0', 'vuelo', 'vuelo1', 'eliminar', 'editar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Boleto>;

  // @ts-ignore
  dataSource2: MatTableDataSource<Boleto>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private boletoService: BoletoService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.listar(params['id'])
      this.id = params['id'];
    })
  }

  listar(id?: Number) {
    this.boletoService.getBoletoAll(id).subscribe(value => {
      this.dataSource = new MatTableDataSource(value.filter(value1 => value1.vuelo?.estado == true));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.boletoService.getBoletoAll(id).subscribe(value => {
      this.dataSource2 = new MatTableDataSource(value.filter(value1 => value1.vuelo?.estado == false));
      this.dataSource2.paginator = this.paginator;
      this.dataSource2.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  cancelaruelo(id: Number) {
    this.boletoService.deleteBoleto(id).subscribe(value => {
      this._snackBar.open("Boleto eliminado de forma exitosa", "", {
        duration: 1 * 2000,
      });
      this.listar(this.id);
    }, error => {
      this._snackBar.open(error.error.message, "", {
        duration: 1 * 2000,
      });
    })
  }


  async createPdf(boleto: Boleto) {
    const pdfDefinition: any = {
      background: [
        {
          image: await this.getBase64ImageFromURL('assets/icons/avion-586x490-1.jpg'),
          width:500,height:160
        }
      ],
      content: [
        {
          columns: [
            [
              {columns:[
                  {image:await this.getBase64ImageFromURL('assets/icons/Vuela_v1.png'),width: 50},
                  {text: 'Pass Boarding',width:300,alignment: 'center',fontSize: 18, bold: true},
                ],
              },
              {columns:[
                  {text: 'CODIGO: '+boleto.id,width:350,fontSize: 13},
                ],
              },
              {columns:[
                  {text: 'PASAJERO CEDULA: '+boleto.pasajero?.cedula,width:350,fontSize: 13},
                ],
              },
              {columns:[
                  {text: 'PASAJERO NOMBRES: '+boleto.pasajero?.nombre+' '+boleto.pasajero?.nombre,width:350,fontSize: 13},
                ],
              },
              {columns:[
                  {text: 'VUELO: Vielo'+boleto.vuelo?.id,width:350,fontSize: 13},
                ],
              },
              {columns:[
                  {text: 'FECHA Y HORA DE SALIDA: '+boleto.vuelo?.fechaVuelo,width:350,fontSize: 13},
                ],
              },
              {columns:[
                  // @ts-ignore
                  {text: 'ASIENTO: '+boleto.asientos[0].nombre,width:350,fontSize: 13},
                ],
              },
              {columns:[
                  {text: 'RUTA: '+boleto.vuelo?.rutaResponse?.origen+'-'+boleto.vuelo?.rutaResponse?.destino,width:350,fontSize: 13},
                ],
              }
            ],
            {
              qr: 'blob:http://localhost:4200/727e7dc2-73a4-4c44-a084-becae77d593e/1',fit: '160'
            },
          ]
        },
      ],
      pageSize: {width:500,height:160},
      pageMargins: [10, 10, 10, 10],
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

  getBase64ImageFromURL(url: any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        // @ts-ignore
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

}
