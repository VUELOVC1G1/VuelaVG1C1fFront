import {Usuario} from "./usuario";

export class Pasajero {
  id?:Number;
  cedula?:String;
  nombre?:String;
  apellido?:String;
  fechaNacimiento?:Date;
  usuario?:Usuario;
}
