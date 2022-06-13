import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HorarioService} from "../../service/horario.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nuevohorario',
  templateUrl: './nuevohorario.component.html',
  styleUrls: ['./nuevohorario.component.css']
})
export class NuevohorarioComponent implements OnInit {


  firstFormGroup = new FormGroup({
    fechaInicio: new FormControl('', [Validators.required]),
    fechaFin: new FormControl('', [Validators.required]),
  });

  constructor(private horarioService:HorarioService,
              private _snackBar: MatSnackBar,
              private router:Router) { }

  ngOnInit(): void {

  }


  guadarHorario(){
    this.horarioService.postHorarios(this.firstFormGroup.getRawValue()).subscribe(value => {
      this._snackBar.open("Horario creado correctamente", "", {
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
