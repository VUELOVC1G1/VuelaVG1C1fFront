import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {ReportesService} from "../../service/reportes.service";
import {ReportesFac} from "../../models/reportes";
import {DatePipe} from "@angular/common";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reportefacturas',
  templateUrl: './reportefacturas.component.html',
  styleUrls: ['./reportefacturas.component.css']
})
export class ReportefacturasComponent implements OnInit {

  logging:boolean=true

  constructor(private reportesService: ReportesService,
              private title: Title,
              private router:Router) {
  }

  ngOnInit(): void {
    this.title.setTitle("Facturas")
    try {
      if (JSON.parse(sessionStorage['user']).usuario?.rol == "EMPLEADO" && JSON.parse(sessionStorage['user']).id != null) {
        var Fac: Fac[] = [];

        this.reportesService.getReporteFac().subscribe(value => {
          this.logging=false;
          var pipe:DatePipe = new DatePipe('en-US')
          value.forEach(value1 => {
            Fac.push({
              name: pipe.transform(value1.fecha,'MMMM, y')+"",
              // @ts-ignore
              data:[value1.total],
            })
          })
          // @ts-ignore
          Highcharts.chart('container', {
            chart: {
              type: 'column'
            },
            title: {
              text: 'Total de ingremos por mes'
            },
            xAxis: {
              categories: ['mensual']
            },
            yAxis: {
              title: {
                text: 'Total de dinero'
              }
            },
            tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y:.2f}</b> dolares<br/>'
            },
            series:Fac
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

export class Fac {
  name?: String
  data?: number[]

}
