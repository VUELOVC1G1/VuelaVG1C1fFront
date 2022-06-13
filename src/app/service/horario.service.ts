import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Rutas} from "../models/rutas";
import {map, Observable} from "rxjs";
import {Empleado} from "../models/empleado";
import {Horario} from "../models/horario";

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private urlEndPoint:string='https://vuelo-v.herokuapp.com/api/v1';

  constructor(private http:HttpClient) { }

  postHorarios(horarioRequest:Horario):Observable<Horario>{
    console.log(horarioRequest)
    return this.http.post<Horario>(this.urlEndPoint+"/horarios",horarioRequest);
  }
  getHorarios(id?: Number):Observable<Horario>{
    return this.http.get(this.urlEndPoint+"/horarios/"+id);
  }

  getHorariosAll():Observable<Horario[]>{
    return this.http.get(this.urlEndPoint+"/horarios").pipe(map(Response => Response as Horario[]))
  }

  putHorarios(horarioRequest :Horario):Observable<Horario>{
    console.log(horarioRequest)
    return this.http.put<Horario>(this.urlEndPoint+'/horarios',horarioRequest);
  }

  deleteHorarios(id?: Number){
    return this.http.delete<Horario>(this.urlEndPoint+'/horarios/'+id)
  }
}
