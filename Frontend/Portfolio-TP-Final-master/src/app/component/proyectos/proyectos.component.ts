import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectService } from 'src/app/servicios/proyect.service';
import { DatosService } from 'src/app/servicios/service.service';
import { Proyect } from 'src/assets/data/Proyect';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  
  proyectos_list: Proyect [] = [];
  proyectoForm:FormGroup;
  
  constructor(private datosPortfolio: DatosService, private formBuilder: FormBuilder, private proyectService: ProyectService) {
    this.proyectoForm = this.formBuilder.group({
      id:[''],
      proyectoName:['', [Validators.required]],
      descripcion:['', [Validators.required]], 
      img:['', [Validators.required]],
    })
   }

  ngOnInit(): void {
    this.reloadProyect();
  }
  
  private reloadProyect(){
    this.proyectService.obtenerDataProyect().subscribe(
      (dataProyect) => {
        this.proyectos_list = dataProyect
      }
    )
  }

  onSubmit(){
    let proyect: Proyect = this.proyectoForm.value;
    if(this.proyectoForm.get('id')?.value == ''){
      this.proyectService.nuevoProyect(proyect).subscribe(
      () => {
        this.proyectos_list.push(proyect);
        }
      )
    }else{
      this.proyectService.modificarProyect(proyect).subscribe(
        () => {
        this.reloadProyect();
      }
      )
    }
  }

  private loadForm(proyect: Proyect){
    this.proyectoForm.setValue({
      id: proyect.id,
      proyectoName: proyect.proyectoName,
      descripcion: proyect.descripcion,
      img: proyect.img,
      
    })
  }

  private clearForm(){
    this.proyectoForm.setValue({
      id:'',
      proyectoName:'',
      descripcion:'',
      img:'',
    })
  }

  nuevoProyect(){
    this.clearForm();
  }

  editProyect(i: number){
    let proyect: Proyect = this.proyectos_list[i];
    this.loadForm(proyect);
  }

  deleteProyect(i: number){
    let proyect: Proyect = this.proyectos_list[i];
    if(confirm("Seguro queres borrar el registro??!")){
      this.proyectService.deleteProyect(proyect.id).subscribe(
        () => {
          this.reloadProyect();
        }
      )
    }
  }
  

}
