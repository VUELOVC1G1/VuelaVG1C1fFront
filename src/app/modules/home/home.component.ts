import { Component, OnInit } from '@angular/core';
import {PromocionService} from "../../service/promocion.service";
import {Promocion} from "../../models/promocion";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logging:boolean=true

  promociones:Promocion[]=[];

  constructor(private promocionService:PromocionService) { }

  ngOnInit(): void {
    this.ListadoPromociones();
  }

  ListadoPromociones(){
    this.promocionService.getPromocionAll().subscribe(value => {
      // @ts-ignore
      console.log(value.filter(value1 => new Date(value1.vuelo.fechaVuelo)>new Date()))
      // @ts-ignore
      this.promociones=value.filter(value1 => value1.vuelo?.estado==true)
    })
    setTimeout(() => {
      this.logging=false;
    }, 1000)

  }

}
