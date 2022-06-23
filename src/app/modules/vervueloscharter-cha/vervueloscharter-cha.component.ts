import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmpleadoService} from "../../service/empleado.service";
import {CargoService} from "../../service/cargo.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VueloService} from "../../service/vuelo.service";
import {MatTableDataSource} from "@angular/material/table";
import {Vuelo} from "../../models/vuelo";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BoletoService} from "../../service/boleto.service";
import {Boleto} from "../../models/boleto";
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode";
import html2canvas from "html2canvas";
import {DatePipe} from "@angular/common";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-vervueloscharter-cha',
  templateUrl: './vervueloscharter-cha.component.html',
  styleUrls: ['./vervueloscharter-cha.component.css']
})
export class VervueloscharterChaComponent implements OnInit {


  logging:boolean=true

  displayedColumns: string[] = ['fechaVuelo', 'rutaResponse', 'tipoVueloResponse', 'avionResponse', 'editar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Vuelo>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;


  constructor(private activatedRoute: ActivatedRoute,
              private empleadoService: EmpleadoService,
              private cargoService: CargoService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private vueloService: VueloService,
              private boletoService: BoletoService,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle("Ver vuelos")
    try {
      if (JSON.parse(sessionStorage['user']).usuario?.rol == "CHARTER" && JSON.parse(sessionStorage['user']).id != null) {

        this.activatedRoute.params.subscribe(params => {
          this.listarevuelos(params['id'])
        })

      }else {
        this.router.navigate(['/inicio/home'])
      }
    }catch (e){
      this.router.navigate(['/inicio/home'])
    }
  }

  listarevuelos(id: Number) {
    this.vueloService.getVueloAll().subscribe(value => {
      this.logging=false;
      // @ts-ignore
      this.dataSource = new MatTableDataSource(value.filter(value1 => value1.ucharterResponse?.id == id&&value1.estado==true));
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


  obtenerBoletos(id: Number) {
    var boletos: Boleto[];
    this.boletoService.getAll().subscribe(value => {
      boletos = value.filter(value1 => value1.vuelo?.id == id)
      if(boletos.length!=0){
        boletos.filter(value1 => {
          setTimeout(() => {
            this.createPdf(value1)
          }, 500)
        })
      }else {
        this._snackBar.open("Al parecer no existe pasajeros para este vuelo", "", {
          duration: 1 * 2000,
        });
      }
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
                  {image:await this.getBase64ImageFromURL('assets/icons/vuela_v1.png'),width: 50},
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
              qr: 'https://vuelovc1g1.github.io/VuelaVG1C1fFront/inicio/buscarboleto/'+boleto.id,fit: '160'
            },
          ]
        },
      ],
      pageSize: {width:600,height:200},
      pageMargins: [10, 10, 10, 10],
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.download("Pass Boarding "+boleto.pasajero?.nombre+" "+boleto.pasajero?.apellido+".pdf");
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
