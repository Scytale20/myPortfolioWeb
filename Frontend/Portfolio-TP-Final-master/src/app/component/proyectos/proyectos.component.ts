import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProyectService } from 'src/app/servicios/proyect.service';
import { Proyect } from 'src/assets/data/Proyect';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  
  proyectos_list: Proyect [] = [];
  proyectoForm:FormGroup;
  isUserLogged: Boolean = false;
  
  constructor(private formBuilder: FormBuilder, private proyectService: ProyectService, private authService: AuthService, private toast: ToastrService) {
    this.proyectoForm = this.formBuilder.group({
      id:[''],
      proyectoName:['', [Validators.required]],
      descripcion:['', [Validators.required]], 
      img:['', [Validators.required]],
      link:['']
    })
   }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
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
      (nuevoProyect:Proyect) => {
        this.proyectos_list.push(nuevoProyect);
        }
      );
      this.toastCrear();
    }else{
      this.proyectService.modificarProyect(proyect).subscribe(
        () => {
        this.reloadProyect();
      }
      );
      this.toastModificar();
    }
  }

  private loadForm(proyect: Proyect){
    this.proyectoForm.setValue({
      id: proyect.id,
      proyectoName: proyect.proyectoName,
      descripcion: proyect.descripcion,
      img: proyect.img,
      link:proyect.link,
      
    })
  }

  private clearForm(){
    this.proyectoForm.setValue({
      id:'',
      proyectoName:'',
      descripcion:'',
      img:'',
      link:'',
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
      );
      this.toastBorrar();
    }
  }

  toastCrear(){
    if (this.proyectoForm.valid){
      this.toast.success('Proyecto creado correctamente')
    }else{
      this.toast.error('Ups, algo no anduvo bien, revis??!', 'Error')
    }
  }

  toastModificar(){
    if (this.proyectoForm.valid){
      this.toast.success('Proyecto modificado correctamente!')
    }else{
      this.toast.error('Ups, algo no anduvo bien, revis??!', 'Error')
    }
  }

  toastBorrar(){
    this.toast.warning('Registro borrado correctamente', '',{"positionClass": "toast-top-center"})
  }
  

}
