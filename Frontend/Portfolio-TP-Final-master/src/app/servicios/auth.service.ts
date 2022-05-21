import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginDto } from 'src/assets/data/loginDto';
import { datosUrl } from '../../assets/data/config/config'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public login(credentials:LoginDto):Observable<Boolean>{
    return this.http.post<Boolean>(datosUrl.baseUrl + 'login', credentials).pipe(
      tap((response:Boolean)=>{        
        if(response)
        sessionStorage.setItem("usuario", "Scytale")
        
      })
    );
  }

  public logout(){
    sessionStorage.removeItem("usuario")
  }

  public isUserLogged():boolean{
    return sessionStorage.getItem("usuario") !== null;
  }
}
