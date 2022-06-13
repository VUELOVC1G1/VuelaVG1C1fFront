import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pasajero} from "../models/pasajero";
import {map, Observable} from "rxjs";
import {Cargo} from "../models/cargo";
import {TipoAsiento} from "../models/avion";

@Injectable({
  providedIn: 'root'
})
export class TipoasientosService {

  private urlEndPoint:string='https://vuelo-v.herokuapp.com/api/v1/tiposasiento';

  constructor(private http:HttpClient) { }

  gettipsoasientosAll():Observable<TipoAsiento[]>{
    return this.http.get(this.urlEndPoint).pipe(map(Response => Response as TipoAsiento[]));
  }
}
