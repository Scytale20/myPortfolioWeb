import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { Experiencia } from '../../../assets/data/Experiencia'
 

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})

export class ExperienciaLaboralComponent implements OnInit {
  
  experiencia_list: Experiencia[] = [];
  experienciaForm:FormGroup;
  isUserLogged: Boolean = false;

  constructor(private formBuilder:FormBuilder, private experienciaService: ExperienciaService, private authService: AuthService) {
    this.experienciaForm = this.formBuilder.group({
      id:[''],
      empresa:['', [Validators.required]],
      task:['', [Validators.required]],
      img:['', [Validators.required]],
      fechaStart:['', [Validators.required]],
      fechaEnd:['', [Validators.required]],
    })
   }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloadExperiencia();    
    }

    private reloadExperiencia(){
      this.experienciaService.obtenerDatosExperiencia().subscribe(
        (data) => {
          this.experiencia_list = data;         
        }
      )
    }
  


  onSubmit(){
    let experiencia: Experiencia = this.experienciaForm.value;
    if(this.experienciaForm.get('id')?.value == ''){
    this.experienciaService.nuevaExperiencia(experiencia).subscribe(
      (nuevaExperiencia: Experiencia) => {
        this.experiencia_list.push(nuevaExperiencia);
        }      
      );
    }else{
      this.experienciaService.modificarExperiencia(experiencia).subscribe(
        (modificarExperiencia: Experiencia) => {
          this.reloadExperiencia();
        }
      )
    }
    
  }

  private clearForm(){
    this.experienciaForm.setValue({
      id:'',
      empresa:'',
      task:'',
      img:'',
      fechaStart:'',
      fechaEnd:''

    })
  }

  nuevaExperiencia(){
    this.clearForm();
  }

  private loadForm(experiencia: Experiencia){
    this.experienciaForm.setValue({
      id: experiencia.id,
      empresa: experiencia.empresa,
      task: experiencia.task,
      img: experiencia.img,
      fechaStart: experiencia.fechaStart,
      fechaEnd: experiencia.fechaEnd,
    })
  }

  editarExperiencia(indice: number){
    let experiencia: Experiencia = this.experiencia_list[indice];
    this.loadForm(experiencia);
  }

  borrarExperiencia(indice: number){
    let experiencia: Experiencia = this.experiencia_list[indice];
    if (confirm("Seguro desea borrar el registro?!")){
      this.experienciaService.deleteExperiencia(experiencia.id).subscribe(
        () => {
          this.reloadExperiencia();
        }
      )
    }
  }
  
}
