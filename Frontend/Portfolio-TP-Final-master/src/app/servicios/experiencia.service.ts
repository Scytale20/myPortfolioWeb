import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../../assets/data/Experiencia'
import { datosUrl } from '../../assets/data/config/config'

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  constructor(private http:HttpClient) { }

  obtenerDatosExperiencia(): Observable<Experiencia[]>{
    return this.http.get<any>(datosUrl.baseUrl + 'ver/experiencia');
  }

  nuevaExperiencia(experiencia: Experiencia): Observable<Experiencia>{
    return this.http.post<any>(datosUrl.baseUrl + 'new/experiencia', experiencia);
  }

  modificarExperiencia(experiencia: Experiencia): Observable<any>{
    return this.http.put<any>(datosUrl.baseUrl + 'mod/experiencia', experiencia );
  }

  deleteExperiencia(id: number): Observable<any>{
    return this.http.delete<any>(datosUrl.baseUrl + 'del/experiencia/' + id)
  }
}
