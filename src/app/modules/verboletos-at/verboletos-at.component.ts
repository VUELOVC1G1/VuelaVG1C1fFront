import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Boleto} from "../../models/boleto";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {BoletoService} from "../../service/boleto.service";
import {DatePipe} from "@angular/common";
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode";
import html2canvas from "html2canvas";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-verboletos-at',
  templateUrl: './verboletos-at.component.html',
  styleUrls: ['./verboletos-at.component.css']
})
export class VerboletosAtComponent implements OnInit {
  logging:boolean=true

  id?: Number;

  displayedColumns: string[] = ['cedula','nombres', 'asientos1', 'vuelo0', 'vuelo', 'vuelo1', 'eliminar', 'editar'];

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
              private boletoService: BoletoService,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle("Ver Boletos")
    this.listar("")
  }

  listar(cedula:String) {
    this.boletoService.getAll().subscribe(value => {
      this.logging=false;
      this.dataSource = new MatTableDataSource(value.filter(value1 => value1.vuelo?.estado == true&&value1.pasajero?.cedula?.includes(cedula+'')));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },error => {
      this.logging=false;
    })
  }

  fitrarcedula(cedula: HTMLInputElement){
    if(cedula.value!=""){
      this.listar(cedula.value)
    }else {
      this.listar("")
    }
  }


  limpar(){
    this.listar("")
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
    }, error => {
      this._snackBar.open(error.error.message, "", {
        duration: 1 * 2000,
      });
    })
  }


  async createPdf(boleto: Boleto) {
    var pipe:DatePipe = new DatePipe('en-US')
    const pdfDefinition: any = {
      background: [
        {
          image: await this.getBase64ImageFromURL('https://d500.epimg.net/cincodias/imagenes/2015/03/24/lifestyle/1427217388_716421_1427217969_noticia_normal.jpg'),
          width:600,height:200
        }
      ],
      content: [
        {
          columns: [
            [
              {columns:[
                  {image:await this.getBase64ImageFromURL('assets/icons/Vuela_v1.png'),width: 50},
                  {text: 'Pass Boarding',width:350,alignment: 'center',fontSize: 20, bold: true,color:'white'},
                ],
              },
              {columns:[
                  {text: 'CODIGO: '+boleto.id,width:450,fontSize: 15,background:'white'},
                ],
              },
              {columns:[
                  {text: 'PASAJERO CEDULA: '+boleto.pasajero?.cedula,width:450,fontSize: 15,color:'white'},
                ],
              },
              {columns:[
                  {text: 'PASAJERO NOMBRES: '+boleto.pasajero?.nombre+' '+boleto.pasajero?.nombre,width:450,fontSize: 15,color:'white'},
                ],
              },
              {columns:[
                  {text: 'VUELO: Vielo'+boleto.vuelo?.id,width:450,fontSize: 15,color:'white'},
                ],
              },
              {columns:[
                  {text: 'FECHA Y HORA DE SALIDA: '+pipe.transform(boleto.vuelo?.fechaVuelo,'medium'),width:450,fontSize: 15,color:'white'},
                ],
              },
              {columns:[
                  // @ts-ignore
                  {text: 'ASIENTO: '+boleto.asientos[0].nombre,width:450,fontSize: 15,color:'white'},
                ],
              },
              {columns:[
                  {text: 'SALA DE ABORDAJE: '+boleto.vuelo?.salaEspera,width:450,fontSize: 15,color:'white'},
                ],
              },
              {columns:[
                  {text: 'RUTA: '+boleto.vuelo?.rutaResponse?.origen+'-'+boleto.vuelo?.rutaResponse?.destino,width:450,fontSize: 15,color:'white'},
                ],
              }
            ],
            {
              qr: 'blob:http://localhost:4200/727e7dc2-73a4-4c44-a084-becae77d593e/1',fit: '160'
            },
          ]
        },
      ],
      pageSize: {width:600,height:200},
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
