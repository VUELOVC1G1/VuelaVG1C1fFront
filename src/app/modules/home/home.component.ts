import { Component, OnInit } from '@angular/core';
import {PromocionService} from "../../service/promocion.service";
import {Promocion} from "../../models/promocion";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logging:boolean=true

  promociones:Promocion[]=[];

  constructor(private promocionService:PromocionService,
              private title: Title) { }

  ngOnInit(): void {
    this.ListadoPromociones();
  }

  ListadoPromociones(){
    this.title.setTitle("Inicio")
    this.promocionService.getPromocionAll().subscribe(value => {
      // @ts-ignore
      this.promociones=value.filter(value1 => value1.vuelo?.estado==true)
    })
    setTimeout(() => {
      this.logging=false;
    }, 1000)

  }

}
