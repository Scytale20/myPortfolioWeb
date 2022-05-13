import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from 'src/app/servicios/service.service';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})

export class ExperienciaLaboralComponent implements OnInit {
  
  experiencia_list:any;
  experienciaForm:FormGroup;

  constructor(private datosPortfolio: DatosService, private formBuilder:FormBuilder) {
    this.experienciaForm = this.formBuilder.group({
      id:[''],
      empresa:['', [Validators.required]],
      task:['', [Validators.required]],
      img:['', [Validators.required]],
      fecha_Start:['', [Validators.required]],
      fecha_End:['', [Validators.required]],
    })
   }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.experiencia_list=data.experiencia
      
  });
  }
  onSubmit(){
    console.log(this.experienciaForm.value)
  }
}
