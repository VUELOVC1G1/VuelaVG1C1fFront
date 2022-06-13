import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Empleado} from "../models/empleado";
import {Rutas} from "../models/rutas";

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  private urlEndPoint:string='https://vuelo-v.herokuapp.com/api/v1';

  constructor(private http:HttpClient) { }

  postRutas(rutaRequest:Rutas):Observable<Rutas>{
    console.log(rutaRequest.destino)
    return this.http.post<Rutas>(this.urlEndPoint+"/rutas",rutaRequest);
  }
  getRutas(id?: Number):Observable<Rutas>{
    return this.http.get(this.urlEndPoint+"/rutas/"+id);
  }

  getRutasAll():Observable<Rutas[]>{
    return this.http.get(this.urlEndPoint+"/rutas/all").pipe(map(Response => Response as Rutas[]))
  }

  putRutas(rutaRequest :Rutas):Observable<Rutas>{
    console.log(rutaRequest)
    return this.http.put<Rutas>(this.urlEndPoint,rutaRequest);
  }

  deleteRutas(id?: Number){
    return this.http.delete<Empleado>(this.urlEndPoint+'/rutas/'+id)
  }
}
