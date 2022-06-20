import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RutasService} from "../../service/rutas.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsuariocharterService} from "../../service/usuariocharter.service";

@Component({
  selector: 'app-manifiesto',
  templateUrl: './manifiesto.component.html',
  styleUrls: ['./manifiesto.component.css']
})
export class ManifiestoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private rutasService:RutasService,
              private _snackBar: MatSnackBar,
              private router :Router,
              private usuariocharterService:UsuariocharterService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.usuariocharterService.getCharterAll().subscribe(value => {
        console.log(value.filter(value1 => value1.id==params['id'])[0])
      })
    })
  }



}
