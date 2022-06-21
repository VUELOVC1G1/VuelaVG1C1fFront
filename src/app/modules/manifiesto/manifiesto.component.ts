import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RutasService} from "../../service/rutas.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsuariocharterService} from "../../service/usuariocharter.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Mafiniesto} from "../../models/mafiniesto";
import {ManifiestoService} from "../../service/manifiesto.service";

@Component({
  selector: 'app-manifiesto',
  templateUrl: './manifiesto.component.html',
  styleUrls: ['./manifiesto.component.css']
})
export class ManifiestoComponent implements OnInit {


  id?:Number;
  constructor(private activatedRoute: ActivatedRoute,
              private rutasService:RutasService,
              private _snackBar: MatSnackBar,
              private router :Router,
              private usuariocharterService:UsuariocharterService,
              private manifiestoService:ManifiestoService) { }


  FormGroup = new FormGroup({
    documento: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id=params['id']
      this.usuariocharterService.getCharterAll().subscribe(value => {
        this.documento.charterRequest=value.filter(value1 => value1.id==params['id'])[0]
      })
    })
  }


  subirManifiesto(file: FileList){
    getBase64(file[0]).then(docx=>{
      this.documento.documento=docx+'';
    })
  }

  documento:Mafiniesto= new Mafiniesto();
  gurdarManifiesto(){
    this.manifiestoService.postManifiesto(this.id,this.documento).subscribe(value => {
      this._snackBar.open("Manifiesto enviada correctamente", "", {
        duration: 1 * 2000,
      });
    }, error => {
      this._snackBar.open(error.error.message, "", {
        duration: 1 * 2000,
      });
    })
  }



}

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
