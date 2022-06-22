import { Component, OnInit } from '@angular/core';
import {PromocionService} from "../../service/promocion.service";
import {Promocion} from "../../models/promocion";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-verprocioneshome',
  templateUrl: './verprocioneshome.component.html',
  styleUrls: ['./verprocioneshome.component.css']
})
export class VerprocioneshomeComponent implements OnInit {

  logging:boolean=true
  promociones:Promocion[]=[];

  constructor(private promocionService:PromocionService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Promociones")
    this.promocionService.getPromocionAll().subscribe(value => {
      this.logging=false;
      // @ts-ignore
      this.promociones=value.filter(value1 => value1.vuelo?.estado==true)
    },error => {
      this.logging=false;
    })
  }

}
