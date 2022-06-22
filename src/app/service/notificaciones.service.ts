import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Mafiniesto} from "../models/mafiniesto";
import {Notificacion} from "../models/notificacion";

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  private urlEndPoint:string='https://vuelav-api.herokuapp.com/api/v1/vuelos';

  constructor(private http:HttpClient) { }

  getNoficaciones(id?: Number):Observable<Notificacion[]>{
    return this.http.get(this.urlEndPoint+"/pasajero/"+id).pipe(map(Response => Response as Notificacion[]))
  }

}
