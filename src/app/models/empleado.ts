import {Usuario} from "./usuario";
import {Cargo} from "./cargo";

export class Empleado {
  id?:Number;
  cedula?:String;
  nombre?:String;
  estado?:boolean;
  apellido?:String;
  fechaNacimiento?:Date;
  usuario?:Usuario;
  cargoDto?:Cargo;
  cargo?:Cargo;
}
