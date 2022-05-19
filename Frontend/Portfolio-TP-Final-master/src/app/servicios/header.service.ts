import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Header } from 'src/assets/data/Header';
import { Info } from 'src/assets/data/Info';
import { datosUrl } from '../../assets/data/config/config'

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  obtenerDataHeader(): Observable<Header[]>{
    return this.http.get<any>(datosUrl.baseUrl + 'ver/header');
  }

  modificarHeader(head: Header): Observable<any>{
    return this.http.put<any>(datosUrl.baseUrl + 'mod/header', head);
  }

  obtenerDataInfo(): Observable<Info[]>{
    return this.http.get<any>(datosUrl.baseUrl + 'ver/info')
  }

  modificarInfo(info: Info): Observable<any>{
    return this.http.put<any>(datosUrl.baseUrl + 'mod/info', info);
  }
}
