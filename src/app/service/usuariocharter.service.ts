import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../models/usuario";
import {map, Observable} from "rxjs";
import {Usuariocharter} from "../models/usuariocharter";
import {Horario} from "../models/horario";
import {Empleado} from "../models/empleado";

@Injectable({
  providedIn: 'root'
})
export class UsuariocharterService {

  private urlEndPoint:string='https://vuelav-api.herokuapp.com/api/v1/';

  constructor(private http:HttpClient) { }

  postCharter(request:Usuariocharter):Observable<Usuario>{
    console.log(request)
    return this.http.post<Usuariocharter>(this.urlEndPoint+"auth/signup/charter",request);
  }
  putCharter(idUCharter?:Number,charterRequest?:Usuariocharter):Observable<Usuario>{
    console.log(charterRequest)
    return this.http.put<Usuariocharter>(this.urlEndPoint+"charters/usuario/"+idUCharter,charterRequest);
  }
  getCharterAll():Observable<Usuariocharter[]>{
    return this.http.get(this.urlEndPoint+"charters/all").pipe(map(Response => Response as Usuariocharter[]))
  }
  getCharter(id?: Number):Observable<Usuariocharter>{
    return this.http.get(this.urlEndPoint+"charters/usuario/"+id);
  }

}
