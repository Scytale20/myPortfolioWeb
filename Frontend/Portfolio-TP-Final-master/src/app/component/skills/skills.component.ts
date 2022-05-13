import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from 'src/app/servicios/service.service'; 

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  
  skills_list:any;
  skillForm:FormGroup;
  
  constructor(private datosPortfolio: DatosService, private formBuilder:FormBuilder) {
    this.skillForm = this.formBuilder.group({
      id:[''],
      skill:['', [Validators.required]],
      percent:['', [Validators.required]], 
      img:['', [Validators.required]],
    })
   }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.skills_list=data.skills      
    })
  }

  onSubmit(){
    console.log(this.skillForm.value)
  }

}
