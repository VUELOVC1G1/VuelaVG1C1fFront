import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import * as Highcharts from "highcharts";
import {ReportesService} from "../../service/reportes.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {ReportesVue} from "../../models/reportes";
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-reportervuelo',
  templateUrl: './reportervuelo.component.html',
  styleUrls: ['./reportervuelo.component.css']
})
export class ReportervueloComponent implements OnInit {

  logging: boolean = true

  constructor(private reportesService: ReportesService,
              private title: Title,
              private router: Router) {
  }

  ngOnInit(): void {
    this.title.setTitle("Vuelos")
    try {
      if (JSON.parse(sessionStorage['user']).usuario?.rol == "EMPLEADO" && JSON.parse(sessionStorage['user']).id != null) {
        var Vue: Vuelo[] = [];
        this.reportesService.getReporteVue().subscribe(value => {
          this.logging = false;
          var pipe: DatePipe = new DatePipe('en-US')
          value.forEach(value1 => {
            Vue.push({
              name: pipe.transform(value1.fecha, 'MMMM d, y') + "",
              // @ts-ignore
              data: [value1.numVuelos],
            })
          })
          // @ts-ignore
          Highcharts.chart('container', {
            chart: {
              type: 'column'
            },
            title: {
              text: 'Total de vuelos por dia'
            },
            xAxis: {
              categories: ['Diario']
            },
            yAxis: {
              title: {
                text: 'Total de vuelos'
              }
            },
            tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> vuelos<br/>'
            },
            series: Vue
          });
        }, error => {
          this.logging = false;
        })
      } else {
        this.router.navigate(['/inicio/home'])
      }
    } catch (e) {
      this.router.navigate(['/inicio/home'])
    }
  }

  async createPdf() {
    var pipe: DatePipe = new DatePipe('en-US')
    var dia: String = new Date().toISOString();
    this.reportesService.getReporteVue().subscribe(async value => {
      const pdfDefinition: any = {
        content: [
          {image: await this.getBase64ImageFromURL('assets/icons/vuela_v1.png'), width: 50},
          {
            text: '_________________________________________________________________________________________',
            alignment: 'center'
          },
          // @ts-ignore
          {text: pipe.transform(dia, 'MMMM d, y'), alignment: 'right'},
          {text: 'REPORTE DE VUELOS', fontSize: 15, bold: true, alignment: 'center'},
          {text: 'NUMERO DE VUELOS DIARIOS', fontSize: 15, margin: [0, 0, 20, 0]},
          {text: '    '},
          {text: 'La aereolinea Vuela V diariamente lleva los siguentes vuelos:'},
          {text: '    '},
          {
            table: {
              headerRows: 1,
              widths: ['50%','50%'],
              body: [
                ['Fecha de vuelo', 'Número de vuelos'],
                [  value.map(function(item){
                  return item.fecha+''
                }),
                  value.map(function(item){
                    return item.numVuelos+''
                  })
                ],

              ]
            }
          }
        ],
      }
      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    })
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

  CalculateAge(fecha?: Date): number {
    if (fecha != null) {
      const convertAge = new Date(fecha);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    } else {
      return 0;
    }
  }
}

export class Vuelo {
  name?: String
  data?: number[]

}
