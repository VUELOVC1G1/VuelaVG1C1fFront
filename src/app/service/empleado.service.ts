import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pasajero} from "../models/pasajero";
import {map, Observable} from "rxjs";
import {Empleado} from "../models/empleado";
import {Usuario} from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint:string='https://vuelav-api.herokuapp.com/api/v1/';

  constructor(private http:HttpClient) { }

  getEmpleado(id: Number | undefined):Observable<Empleado>{
    return this.http.get(this.urlEndPoint+"empleados/usuario/"+id);
  }

  getEmpleadoAll():Observable<Empleado[]>{
    return this.http.get(this.urlEndPoint+"empleados/all").pipe(map(Response => Response as Empleado[]))
  }

  postEmpleado(request:Empleado):Observable<Empleado>{
    console.log(request)
    return this.http.post<Empleado>(this.urlEndPoint+"auth/signup/empleado",request);
  }

  putEmpleado(EmpleadoRequest :Empleado,idEmpleado?: Number):Observable<Empleado>{
    console.log(EmpleadoRequest)
    return this.http.put<Empleado>(this.urlEndPoint+"empleados/"+idEmpleado,EmpleadoRequest);
  }

  deleteEmpleado(id?: Number){
    return this.http.delete<Empleado>(this.urlEndPoint+'empleados/'+id)
  }

}
