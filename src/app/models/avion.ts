export class Avion {
  id?:Number;
  marca?:String;
  modelo?:String;
  nombre?:String;
  placa?:String;
  wifi?:String;
  estado?:boolean;
  asientos?:Asientos[];


}
export class Asientos{
  id?:Number;
  nombre?:String;
  precio?:number;
  tipoAsiento?:TipoAsiento;

}
export class TipoAsiento{
  id?:Number;
  nombre?:String;
}
