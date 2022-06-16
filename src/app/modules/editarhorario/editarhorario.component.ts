import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HorarioService} from "../../service/horario.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Vuelo} from "../../models/vuelo";

@Component({
  selector: 'app-editarhorario',
  templateUrl: './editarhorario.component.html',
  styleUrls: ['./editarhorario.component.css']
})
export class EditarhorarioComponent implements OnInit {

  vuelos:Vuelo[]=[];

  firstFormGroup = new FormGroup({
    id: new FormControl(''),
    fechaInicio: new FormControl('', [Validators.required]),
    fechaFin: new FormControl('', [Validators.required]),
  });

  constructor(private activatedRoute: ActivatedRoute,
              private horarioService:HorarioService,
              private _snackBar: MatSnackBar,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.horarioService.getHorarios(params['id']).subscribe(value => {
        this.firstFormGroup.setValue(value);
      })
    })
  }

  actualizarHorario(){
    this.horarioService.putHorarios(this.firstFormGroup.getRawValue()).subscribe(value => {
      this._snackBar.open("Horario actualizado correctamente", "", {
        duration: 1 * 2000,
      });
      this.router.navigate(['/inicio/verhoraios'])
    }, error => {
      this._snackBar.open(error.error.message, "", {
        duration: 1 * 2000,
      });
    })
  }

}
