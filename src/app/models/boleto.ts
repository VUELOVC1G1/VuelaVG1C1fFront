import {Asientos} from "./avion";
import {Vuelo} from "./vuelo";

export class Boleto {
  id?:Number;
  fecha?:Date;
  pasajeroId?:Number;
  qr?:String;
  vueloId?:Number;
  asientos?:Asientos[];
  maletas?:Maleta[];
  pago?:Pago;
  vuelo?:Vuelo;
}

export class Maleta {
  id?:Number;
  peso?:String;
  precio?:number;
}

export class Pago {
  id?:Number;
  estado?:boolean;
  tipo?:String;
  valor?:String;
}
