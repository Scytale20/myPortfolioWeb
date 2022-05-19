import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationService} from 'src/app/servicios/education.service';
import { Educacion } from 'src/assets/data/Educacion';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  
  educacion_list: Educacion[] = []
  educationForm:FormGroup;
  
  constructor(private formbuilder:FormBuilder, private educationService: EducationService ) {
    this.educationForm = this.formbuilder.group({
      id:[''], 
      institucion:['', [Validators.required]],
      estudios:['', [Validators.required]],
      img: ['', [Validators.required]],
      fechaStart:['', [Validators.required]],
      fechaEnd:['', [Validators.required]] 
      
    })
   }

  ngOnInit(): void {
    this.reloadEducacion();
          
    }    
  

  private reloadEducacion() {
    this.educationService.obtenerDatosEducation().subscribe(
      (data) =>{
        this.educacion_list = data;
      }
    )
    
  }
  

  onSubmit(){
    let educacion: Educacion = this.educationForm.value;
    if (this.educationForm.get('id')?.value == ''){
    this.educationService.nuevaEducacion(educacion).subscribe(
      (nuevaEducacion:Educacion) => {
        this.educacion_list.push(nuevaEducacion);
        }      
      );
    }else{
      this.educationService.modificaEducacion(educacion).subscribe(
        (modificaEducacion:Educacion) => {
          this.reloadEducacion()
        }
      )
    }
  }



  private clearForm(){
    this.educationForm.setValue({
      id:'',
      institucion:'',
      estudios:'',
      img:'',
      fechaStart:'',
      fechaEnd:'', 
    })
  }

  private loadForm(educacion: Educacion){
    this.educationForm.setValue({
      id: educacion.id,
      institucion: educacion.institucion,
      estudios: educacion.estudios,
      img:educacion.img,
      fechaStart:educacion.fechaStart,      
      fechaEnd:educacion.fechaEnd
    }) 

  }

  nuevaEducacion(){
    this.clearForm();
  }

  editarEducacion(indice: number){
    let educacion: Educacion = this.educacion_list[indice];
    this.loadForm(educacion)
  }

  borrarEducacion(indice: number){
    let educacion: Educacion = this.educacion_list[indice];
    if(confirm("Seguro queres borrar el registro?!")){
      this.educationService.deleteEducacion(educacion.id).subscribe(
        () => {
          this.reloadEducacion();
        }
      )
    }
  }

}
