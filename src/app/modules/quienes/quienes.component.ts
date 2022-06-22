import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quienes',
  templateUrl: './quienes.component.html',
  styleUrls: ['./quienes.component.css']
})
export class QuienesComponent implements OnInit {
  logging:boolean=true
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.logging=false;
    }, 1000)
  }

}
