import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from 'src/app/servicios/service.service'; 
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
  
  constructor(private datosPortfolio: DatosService, private formBuilder:FormBuilder, private skillService: SkillsService) {
    this.skillForm = this.formBuilder.group({
      id:[''],
      skillName:['', [Validators.required]],
      percent:['', [Validators.required]], 
      img:['', [Validators.required]],
    })
   }

  ngOnInit(): void {
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
      )
    }else{
      this.skillService.modificarSkill(skill).subscribe(
        (modificaSkil: Skill) => {
          this.reloadSkill();
        }
      )
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
      )
    }
  }

}
