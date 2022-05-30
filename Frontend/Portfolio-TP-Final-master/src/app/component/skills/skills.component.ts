import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servicios/auth.service';
import { SkillsService } from 'src/app/servicios/skills.service';
import { Skill } from '../../../assets/data/skill'

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  
  skills_list: Skill[] = [];
  skillForm:FormGroup;
  isUserLogged: Boolean = false;
  
  constructor(private formBuilder:FormBuilder, private skillService: SkillsService, private authService: AuthService, private toast: ToastrService) {
    this.skillForm = this.formBuilder.group({
      id:[''],
      skillName:['', [Validators.required]],
      percent:['', [Validators.required]], 
      img:['', [Validators.required]],
    })
   }

  ngOnInit(): void {
      this.isUserLogged = this.authService.isUserLogged();
      this.reloadSkill();    
    }

    private reloadSkill(){
      this.skillService.obtenerDatosSkills().subscribe(
        (dataSkills) => {
          this.skills_list = dataSkills;
        }
      )   
    }

  

  onSubmit(){    
    let skill: Skill = this.skillForm.value;
    if(this.skillForm.get('id')?.value == ''){
    this.skillService.nuevaSkill(skill).subscribe(
      (nuevaSkill: Skill) => {
        this.skills_list.push(nuevaSkill);
        }
      );
      this.toastCrear();
    }else{
      this.skillService.modificarSkill(skill).subscribe(
        () => {
          this.reloadSkill();
        }
      );
      this.toastModificar();
    }
  }

  private loadForm(skill: Skill){
    this.skillForm.setValue({
      id: skill.id,
      skillName: skill.skillName,
      percent: skill.percent,
      img: skill.img,
    })    
  }

  private clearForm(){
    this.skillForm.setValue({
      id:'',
      skillName:'',
      percent:'',
      img:'',
    })
  }

  nuevaSkill(){
    this.clearForm();
  }

  editarSkill(indice: number){
    let skill: Skill = this.skills_list[indice];
    this.loadForm(skill);
  }

  borrarSkill(indice:number){
    let skill: Skill = this.skills_list[indice];
    if(confirm("Seguro queres borrar el registro?!")){
      this.skillService.deleteSkill(skill.id).subscribe(
        () => {
          this.reloadSkill();
        }
      );
      this.toastBorrar();
    }
  }

  toastCrear(){
    if (this.skillForm.valid){
      this.toast.success('Skill creada correctamente')
    }else{
      this.toast.error('Ups, algo no anduvo bien, revisá!', 'Error')
    }
  }

  toastModificar(){
    if (this.skillForm.valid){
      this.toast.success('Skill modificada correctamente!')
    }else{
      this.toast.error('Ups, algo no anduvo bien, revisá!', 'Error')
    }
  }

  toastBorrar(){
    this.toast.warning('Registro borrado correctamente', 'Borrar',{"positionClass": "toast-top-center"})
  }

}
