import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-equipaje-info',
  templateUrl: './equipaje-info.component.html',
  styleUrls: ['./equipaje-info.component.css']
})
export class EquipajeInfoComponent implements OnInit {

  logging:boolean=true


  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Equipaje")
    setTimeout(() => {
      this.logging=false;
    }, 1000)
  }

}
