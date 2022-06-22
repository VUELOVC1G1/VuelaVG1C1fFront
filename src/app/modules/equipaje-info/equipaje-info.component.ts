import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipaje-info',
  templateUrl: './equipaje-info.component.html',
  styleUrls: ['./equipaje-info.component.css']
})
export class EquipajeInfoComponent implements OnInit {

  logging:boolean=true


  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.logging=false;
    }, 1000)
  }

}
