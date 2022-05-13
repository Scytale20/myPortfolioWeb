import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from 'src/app/servicios/service.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  
  proyectos_list:any;
  proyectoForm:FormGroup;
  
  constructor(private datosPortfolio: DatosService, private formBuilder: FormBuilder) {
    this.proyectoForm = this.formBuilder.group({
      id:[''],
      proyecto:['', [Validators.required]],
      descripcion:['', [Validators.required]], 
      img:['', [Validators.required]],
    })
   }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.proyectos_list=data.proyectos      
    });
  }

  onSubmit(){
    console.log(this.proyectoForm.value)
  }

}
