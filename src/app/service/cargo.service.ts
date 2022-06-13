import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Empleado} from "../models/empleado";
import {Cargo} from "../models/cargo";

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private urlEndPoint:string='https://vuelo-v.herokuapp.com/api/v1/cargos';

  constructor(private http:HttpClient) { }

  getcargoAll():Observable<Cargo[]>{
    return this.http.get(this.urlEndPoint).pipe(map(Response => Response as Cargo[]));
  }
}
