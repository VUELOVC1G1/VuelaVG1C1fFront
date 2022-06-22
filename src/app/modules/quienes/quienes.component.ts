import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-quienes',
  templateUrl: './quienes.component.html',
  styleUrls: ['./quienes.component.css']
})
export class QuienesComponent implements OnInit {
  logging:boolean=true
  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Quién somos")
    setTimeout(() => {
      this.logging=false;
    }, 1000)
  }

}
