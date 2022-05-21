import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup
  logginIncorrecto: Boolean = false;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router) { 
    this.form=this.formBuilder.group(
      {
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required, Validators.minLength(6)]]
      }
    )
  }


  ngOnInit(): void {
  }

  onSubmit(event:Event){
    event.preventDefault;
    
    this.authService.login(this.form.value).subscribe(
      (response: Boolean) => {
        if(response){
          this.router.navigate(['/portfolio'])
        }else{
          this.logginIncorrecto = true;
        }        
      } 
    )    
  }

  get Email(){
    return this.form.get('email');
  }

  get Password(){
    return this.form.get('password');
  }

  
}
