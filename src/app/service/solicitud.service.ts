import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Rutas} from "../models/rutas";
import {map, Observable} from "rxjs";
import {Empleado} from "../models/empleado";
import {Solicitud} from "../models/solicitud";

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private urlEndPoint:string='https://vuelav-api.herokuapp.com/api/v1';

  constructor(private http:HttpClient) { }

  postSolicitud(pedidoRequest:Solicitud):Observable<Solicitud>{
    console.log(pedidoRequest)
    return this.http.post<Solicitud>(this.urlEndPoint+"/pedidos",pedidoRequest);
  }
  getSolicitud(id?: Number):Observable<Solicitud>{
    return this.http.get(this.urlEndPoint+"/pedidos/"+id);
  }

  getSolicitudAll():Observable<Solicitud[]>{
    return this.http.get(this.urlEndPoint+"/pedidos").pipe(map(Response => Response as Solicitud[]))
  }

  putSolicitud(pedidoRequest :Solicitud):Observable<Solicitud>{
    console.log(pedidoRequest)
    return this.http.put<Solicitud>(this.urlEndPoint+"/pedidos",pedidoRequest);
  }

  deleteRutas(id: Number){
    return this.http.delete<Solicitud>(this.urlEndPoint+'/pedidos/'+id)
  }
}
