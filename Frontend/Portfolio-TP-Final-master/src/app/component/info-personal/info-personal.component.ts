import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servicios/auth.service';
import { HeaderService } from 'src/app/servicios/header.service';
import { Info } from 'src/assets/data/Info';

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.component.html',
  styleUrls: ['./info-personal.component.css']
})
export class InfoPersonalComponent implements OnInit {
  
  acerca_de:any = []
  infoForm:FormGroup;
  isUserLogged: Boolean = false;

  constructor(private formBuilder: FormBuilder, private headerService:HeaderService, private authService: AuthService, private toast: ToastrService) {
    this.infoForm = this.formBuilder.group({
      id:[''],
      info:['']

    })
   }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();

    this.reloadInfo()
    
  }

  private reloadInfo(){
    
    this.headerService.obtenerDataInfo().subscribe(
      (data) => {
        this.acerca_de = data[0]
      }
    )
  }

  onSubmit(){
    let info: Info = this.infoForm.value;
    this.headerService.modificarInfo(info).subscribe(
      () => {
        this.reloadInfo();
      }
    );
    this.toastModificar();    
  }

  private loadForm(info: Info){
    this.infoForm.setValue({    
      id:info.id,  
      info:info.info 
    })
  }

  editarInfo(){
    let info: Info = this.acerca_de
    this.loadForm(info)    
  }

  toastModificar(){    
    this.toast.success('Registro modificado correctamente!')   
  }

}
