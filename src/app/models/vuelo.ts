import {Rutas} from "./rutas";
import {Usuariocharter} from "./usuariocharter";
import {Horario} from "./horario";
import {Avion} from "./avion";

export class Vuelo {
  id?:Number;
  observacion?:String;
  precio?:String;
  estado?:boolean;
  fechaCreacion?:Date;
  fechaVuelo?:String;
  rutaRequest?:Rutas;
  ucharterResponse?:Usuariocharter;
  tipoVueloRequest?:TiposVuelo;
  horarioRequest?:Horario;
  avionid?:Number;
  avionResponse?:Vuelo;
  tipoVueloResponse?:TiposVuelo;
  rutaResponse?:Rutas;
  horarioResponse?:Horario;
}

export class TiposVuelo{
  id?:Number;
  nombre?:String;
}
