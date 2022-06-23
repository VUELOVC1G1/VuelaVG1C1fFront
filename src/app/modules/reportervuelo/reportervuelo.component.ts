import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import * as Highcharts from "highcharts";
import {ReportesService} from "../../service/reportes.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reportervuelo',
  templateUrl: './reportervuelo.component.html',
  styleUrls: ['./reportervuelo.component.css']
})
export class ReportervueloComponent implements OnInit {

  logging:boolean=true
  constructor(private reportesService: ReportesService,
              private title: Title,
              private router:Router) { }

  ngOnInit(): void {
    this.title.setTitle("Vuelos")
    try {
      if (JSON.parse(sessionStorage['user']).usuario?.rol == "EMPLEADO" && JSON.parse(sessionStorage['user']).id != null) {
        var Vue: Vuelo[] = [];
        this.reportesService.getReporteVue().subscribe(value => {
          this.logging=false;
          var pipe:DatePipe = new DatePipe('en-US')
          value.forEach(value1 => {
            Vue.push({
              name: pipe.transform(value1.fecha,'MMMM d, y')+"",
              // @ts-ignore
              data:[value1.numVuelos],
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
            series:Vue
          });
        },error => {
          this.logging=false;
        })
      }else {
        this.router.navigate(['/inicio/home'])
      }
    }catch (e){
      this.router.navigate(['/inicio/home'])
    }
  }

}

export class Vuelo {
  name?: String
  data?: number[]

}
