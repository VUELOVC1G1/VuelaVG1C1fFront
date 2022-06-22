import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {TipoAsiento} from "../models/avion";
import {TiposVuelo} from "../models/vuelo";

@Injectable({
  providedIn: 'root'
})
export class TiposdevueloService {

  private urlEndPoint:string='https://vuelav-api.herokuapp.com/api/v1';

  constructor(private http:HttpClient) { }

  gettiposdevuelosAll():Observable<TiposVuelo[]>{
    return this.http.get(this.urlEndPoint+"/tiposvuelos").pipe(map(Response => Response as TiposVuelo[]));
  }
}
