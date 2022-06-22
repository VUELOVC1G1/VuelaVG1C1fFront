import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  logging:boolean=true
  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Contactos")
    setTimeout(() => {
      this.logging=false;
    }, 1000)
  }

}
