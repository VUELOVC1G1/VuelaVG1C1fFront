import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Usuario} from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint:string='https://vuelo-v.herokuapp.com/api/v1/auth';

  constructor(private http:HttpClient) { }

  iniciarUsuario(request:Usuario):Observable<Usuario>{
    console.log(request)
    return this.http.post<Usuario>(this.urlEndPoint+"/login",request);
  }
}
