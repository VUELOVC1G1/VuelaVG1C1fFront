import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Horario} from "../models/horario";
import {map, Observable} from "rxjs";
import {Mafiniesto} from "../models/mafiniesto";

@Injectable({
  providedIn: 'root'
})
export class ManifiestoService {

  private urlEndPoint:string='https://vuelav-api.herokuapp.com/api/v1/manifiestos';

  constructor(private http:HttpClient) { }

  postManifiesto(idCharter?:Number,manifiestoRequest?:Mafiniesto):Observable<Mafiniesto>{
    console.log(manifiestoRequest)
    return this.http.post<Mafiniesto>(this.urlEndPoint+"/"+idCharter,manifiestoRequest);
  }
  getManifiesto(idManifiesto?: Number):Observable<Mafiniesto>{
    return this.http.get(this.urlEndPoint+"/"+idManifiesto);
  }
  getManifiestobyChar(idCharter?: Number):Observable<Mafiniesto>{
    return this.http.get(this.urlEndPoint+"/charter/"+idCharter);
  }

  getManifiestoAll():Observable<Mafiniesto[]>{
    return this.http.get(this.urlEndPoint+"/all").pipe(map(Response => Response as Mafiniesto[]))
  }

  putManifiesto(idManifiesto?: Number,idCharter?: Number,manifiestoRequest?:Mafiniesto):Observable<Mafiniesto>{
    return this.http.put<Mafiniesto>(this.urlEndPoint+'/'+idManifiesto+"/"+idCharter,manifiestoRequest);
  }

  deleteManifiesto(idManifiesto?: Number){
    return this.http.delete<Mafiniesto>(this.urlEndPoint+'/'+idManifiesto)
  }
}
