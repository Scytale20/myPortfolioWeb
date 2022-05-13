import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatosService } from 'src/app/servicios/service.service';

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.component.html',
  styleUrls: ['./info-personal.component.css']
})
export class InfoPersonalComponent implements OnInit {
  
  acerca_de:any;
  infoForm:FormGroup;

  constructor(private datosPortfolio: DatosService, private formBuilder: FormBuilder) {
    this.infoForm = this.formBuilder.group({
      id:[''],
      info:['']

    })
   }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data=>{
      this.acerca_de=data.acerca_de
    })
  }

  onSubmit(){
    console.log(this.infoForm.value);
  }

}
