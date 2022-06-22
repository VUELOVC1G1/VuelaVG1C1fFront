import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Empleado} from "../models/empleado";
import {Avion} from "../models/avion";

@Injectable({
  providedIn: 'root'
})
export class AvionService {

  private urlEndPoint:string='https://vuelav-api.herokuapp.com/api/v1/aviones';

  constructor(private http:HttpClient) { }

  getAvionAll():Observable<Avion[]>{
    return this.http.get(this.urlEndPoint).pipe(map(Response => Response as Avion[]))
  }

  postAvion(request:Avion):Observable<Avion>{
    console.log(request)
    return this.http.post<Avion>(this.urlEndPoint,request);
  }

  putAvion(request :Avion):Observable<Avion>{
    console.log(request)
    return this.http.put<Avion>(this.urlEndPoint,request);
  }

  deleteAvion(id?: Number){
    return this.http.delete<Avion>(this.urlEndPoint+"/"+id)
  }
}
