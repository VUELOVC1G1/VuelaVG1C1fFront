import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Empleado} from "../models/empleado";
import {Boleto} from "../models/boleto";

@Injectable({
  providedIn: 'root'
})
export class BoletoService {

  private urlEndPoint:string='https://vuelo-v.herokuapp.com/api/v1/boletos';

  constructor(private http:HttpClient) { }

  getBoleto(id?: Number):Observable<Boleto>{
    return this.http.get(this.urlEndPoint+"/"+id);
  }

  getBoletoAll(id?: Number ):Observable<Boleto[]>{
    return this.http.get(this.urlEndPoint+"/pasajero/"+id).pipe(map(Response => Response as Boleto[]))
  }

  postBoleto(request:Boleto):Observable<Boleto>{
    console.log(request)
    return this.http.post<Boleto>(this.urlEndPoint,request);
  }

  deleteBoleto(id?: Number){
    return this.http.delete<Boleto>(this.urlEndPoint+'/'+id)
  }
}
