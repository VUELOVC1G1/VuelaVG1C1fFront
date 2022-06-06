import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../models/usuario";
import {Observable} from "rxjs";
import {Usuariocharter} from "../models/usuariocharter";

@Injectable({
  providedIn: 'root'
})
export class UsuariocharterService {

  private urlEndPoint:string='https://vuelo-v.herokuapp.com/api/v1/auth';

  constructor(private http:HttpClient) { }

  postCharter(request:Usuariocharter):Observable<Usuario>{
    console.log(request)
    return this.http.post<Usuariocharter>(this.urlEndPoint+"/signup/charter",request);
  }
}
