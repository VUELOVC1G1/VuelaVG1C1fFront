import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Notificacion} from "../models/notificacion";
import {HttpClient} from "@angular/common/http";
import {ReportesFac, ReportesVue} from "../models/reportes";

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private urlEndPoint:string='https://vuelav-api.herokuapp.com/api/v1/reportes';

  constructor(private http:HttpClient) { }

  getReporteFac():Observable<ReportesFac[]>{
    return this.http.get(this.urlEndPoint+"/facturas").pipe(map(Response => Response as ReportesFac[]))
  }
  getReporteVue():Observable<ReportesVue[]>{
    return this.http.get(this.urlEndPoint+"/vuelos/dia/c").pipe(map(Response => Response as ReportesVue[]))
  }
}
