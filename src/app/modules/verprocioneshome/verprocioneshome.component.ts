import { Component, OnInit } from '@angular/core';
import {PromocionService} from "../../service/promocion.service";
import {Promocion} from "../../models/promocion";

@Component({
  selector: 'app-verprocioneshome',
  templateUrl: './verprocioneshome.component.html',
  styleUrls: ['./verprocioneshome.component.css']
})
export class VerprocioneshomeComponent implements OnInit {

  promociones:Promocion[]=[];

  constructor(private promocionService:PromocionService) { }

  ngOnInit(): void {
    this.promocionService.getPromocionAll().subscribe(value => {
      // @ts-ignore
      console.log(value.filter(value1 => new Date(value1.vuelo.fechaVuelo)>new Date()))
      // @ts-ignore
      this.promociones=value.filter(value1 => new Date(value1.vuelo.fechaVuelo)>new Date())
    })
  }

}
