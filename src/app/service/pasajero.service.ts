import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../models/usuario";
import {Observable} from "rxjs";
import {Pasajero} from "../models/pasajero";
import {Usuariocharter} from "../models/usuariocharter";

@Injectable({
  providedIn: 'root'
})
export class PasajeroService {

  private urlEndPoint:string='https://vuelo-v.herokuapp.com/api/v1';

  constructor(private http:HttpClient) { }

  postPasajero(request:Pasajero):Observable<Pasajero>{
    console.log(request)
    return this.http.post<Pasajero>(this.urlEndPoint+"/auth/signup/pasajero",request);
  }
  getPasajero(id?: Number):Observable<Pasajero>{
    return this.http.get(this.urlEndPoint+"/pasajeros/usuario/"+id);
  }
}
