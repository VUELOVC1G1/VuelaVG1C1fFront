import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Avion} from "../models/avion";
import {Vuelo} from "../models/vuelo";
import {Rutas} from "../models/rutas";

@Injectable({
  providedIn: 'root'
})
export class VueloService {

  private urlEndPoint:string='https://vuelav-api.herokuapp.com/api/v1/vuelos';

  constructor(private http:HttpClient) { }

  getVueloAll():Observable<Vuelo[]>{
    return this.http.get(this.urlEndPoint).pipe(map(Response => Response as Vuelo[]))
  }
  getVuelo(id?: Number):Observable<Vuelo>{
    return this.http.get(this.urlEndPoint+"/"+id);
  }

  getEstadoAsiento(vueloId?: Number,asientoId?: Number,):Observable<Object>{
    return this.http.get(this.urlEndPoint+"/"+vueloId+"/asientos/"+asientoId+"/estado");
  }

  postVuelo(vueloRequest:Vuelo):Observable<Vuelo>{
    console.log(vueloRequest)
    return this.http.post<Vuelo>(this.urlEndPoint+"/",vueloRequest);
  }

  putVuelo(vueloRequest :Vuelo):Observable<Vuelo>{
    console.log(vueloRequest)
    return this.http.put<Vuelo>(this.urlEndPoint+"/",vueloRequest);
  }

  deleteVuelo(id?: Number){
    return this.http.delete<Vuelo>(this.urlEndPoint+"/"+id)
  }
}
