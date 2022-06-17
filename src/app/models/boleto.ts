import {Asientos} from "./avion";

export class Boleto {
  id?:Number;
  fecha?:Date;
  pasajeroId?:Number;
  qr?:String;
  vueloId?:Number;
  asientos?:Asientos[];
  maletas?:Maleta[];
  pago?:Pago;
}

export class Maleta {
  id?:Number;
  peso?:String;
  precio?:Number;
}

export class Pago {
  id?:Number;
  estado?:boolean;
  tipo?:String;
  valor?:String;
}
