import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datosUrl } from '../../assets/data/config/config';
import { Proyect} from '../../assets/data/Proyect';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  constructor(private http:HttpClient) { }

  obtenerDataProyect(): Observable<Proyect[]>{
    return this.http.get<any>(datosUrl.baseUrl + 'ver/proyecto');
  }

  nuevoProyect(proyect: Proyect): Observable<any>{
    return this.http.post<any>(datosUrl.baseUrl + 'new/proyecto', proyect);
  }

  modificarProyect(proyect: Proyect): Observable<any>{
    return this.http.put<any>(datosUrl.baseUrl + 'mod/proyecto', proyect);
  }

  deleteProyect(indice: number): Observable<any>{
    return this.http.delete<any>(datosUrl.baseUrl + 'del/proyecto/' + indice);
  }

}
