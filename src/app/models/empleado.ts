import {Usuario} from "./usuario";

export class Empleado {
  id?:Number;
  cedula?:String;
  nombre?:String;
  estado?:boolean;
  apellido?:String;
  fechaNacimiento?:Date;
  usuario?:Usuario;
}
