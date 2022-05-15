import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datosUrl } from '../../assets/data/config/config';
import { Skill } from '../../assets/data/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http:HttpClient) { }

  obtenerDatosSkills(): Observable<Skill[]>{
    return this.http.get<any>(datosUrl.baseUrl + 'ver/skill');
  }

  nuevaSkill(skill: Skill): Observable<any>{
    return this.http.post<any>(datosUrl.baseUrl + 'new/skill', skill);
  }

  modificarSkill(skill: Skill): Observable<any>{
    return this.http.put<any>(datosUrl.baseUrl + 'mod/skill', skill);
  }

  deleteSkill(id: number): Observable<any>{
    return this.http.delete<any>(datosUrl.baseUrl + 'del/skill/' + id)
  }
}
