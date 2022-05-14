import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import {Educacion } from '../../assets/data/Educacion';
import { datosUrl } from '../../assets/data/config/config'


@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http:HttpClient) {}
    
  obtenerDatosEducation(): Observable<Educacion[]>{
      return this.http.get<any>(datosUrl.baseUrl + 'ver/educacion');
    }

  nuevaEducacion(educacion: Educacion): Observable<Educacion>{
    return this.http.post<any>(datosUrl.baseUrl + 'new/educacion', educacion);
  }

  modificaEducacion(educacion: Educacion): Observable<any>{
    return this.http.put<any>(datosUrl.baseUrl + 'mod/educacion', educacion);
  }

  deleteEducacion(id: Number): Observable<any>{
    return this.http.delete<any>(datosUrl.baseUrl + 'del/educacion/' + id);
  }
   
}
