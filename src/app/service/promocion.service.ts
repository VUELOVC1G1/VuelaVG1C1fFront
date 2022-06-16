import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Rutas} from "../models/rutas";
import {map, Observable} from "rxjs";
import {Empleado} from "../models/empleado";
import {Promocion} from "../models/promocion";

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  private urlEndPoint:string='https://vuelo-v.herokuapp.com/api/v1';

  constructor(private http:HttpClient) { }

  postPromocion(promocionRequest:Promocion):Observable<Promocion>{
    console.log(promocionRequest)
    return this.http.post<Promocion>(this.urlEndPoint+"/promociones",promocionRequest);
  }
  getPromocion(id?: Number):Observable<Promocion>{
    return this.http.get(this.urlEndPoint+"/promociones/"+id);
  }

  getPromocionAll():Observable<Promocion[]>{
    return this.http.get(this.urlEndPoint+"/promociones").pipe(map(Response => Response as Promocion[]))
  }

  putPromocion(rutaRequest :Rutas):Observable<Promocion>{
    console.log(rutaRequest)
    return this.http.put<Promocion>(this.urlEndPoint+"/promociones",rutaRequest);
  }

  deletePromocion(id?: Number){
    return this.http.delete<Promocion>(this.urlEndPoint+'/promociones/'+id)
  }
}
