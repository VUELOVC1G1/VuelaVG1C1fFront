import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmpleadoService} from "../../service/empleado.service";
import {CargoService} from "../../service/cargo.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VueloService} from "../../service/vuelo.service";
import {BoletoService} from "../../service/boleto.service";
import {Boleto} from "../../models/boleto";

@Component({
  selector: 'app-buscarboletoqr',
  templateUrl: './buscarboletoqr.component.html',
  styleUrls: ['./buscarboletoqr.component.css']
})
export class BuscarboletoqrComponent implements OnInit {


  logging:boolean=true
  boleto:Boleto= new Boleto();

  constructor(private activatedRoute: ActivatedRoute,
              private empleadoService: EmpleadoService,
              private cargoService: CargoService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private vueloService: VueloService,
              private boletoService: BoletoService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.boletoService.getBoleto(params['id']).subscribe(value => {
       this.boleto=value;
        this.logging=false;
      },error => {
        this.logging=false;
      })
    })
  }


  CalculateAge(fecha?:Date): number {
    if (fecha!=null) {
      const convertAge = new Date(fecha);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      return  Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    } else {
      return 0;
    }
  }

}
