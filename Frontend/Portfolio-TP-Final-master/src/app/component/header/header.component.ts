import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servicios/auth.service';
import { HeaderService } from 'src/app/servicios/header.service';
import { Header } from '../../../assets/data/Header'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  headerData: any = [] 
  headerForm:FormGroup;
  isUserLogged: Boolean = false;
  

  constructor(private formbuilder: FormBuilder, private headerService: HeaderService, private authService: AuthService, private toast: ToastrService) {
    this.headerForm = this.formbuilder.group({
      id:[''],
      name:[''],
      backImg:[''],
      profImg:[''], 
      tittle:[''],
      logo:[''],
      tituloLogo:[''],
    })
   }

  ngOnInit(): void {

    this.isUserLogged = this.authService.isUserLogged();
    this.reloadHeader();
  }

  private reloadHeader(){
    
    this.headerService.obtenerDataHeader().subscribe(
      (data) =>{
        this.headerData = data[0]
      }
    )    
  }

  onSubmit(){
    let header: Header = this.headerForm.value;
    this.headerService.modificarHeader(header).subscribe(
      () => {
        this.reloadHeader()
      }
    );
    this.toastModificar();
  }

  private loadForm(head: Header){
    this.headerForm.setValue({  
      id: head.id,    
      name: head.name,
      backImg: head.backImg,
      profImg: head.profImg,
      tittle: head.tittle,
      logo: head.logo,
      tituloLogo: head.tituloLogo,
    })    
  }

  editarHeader(){
    let head: Header = this.headerData
    this.loadForm(head);    
  }
  
  logout(): void{
    this.authService.logout();
    this.isUserLogged = false;
    window.location.reload();  
  }

  toastModificar(){    
      this.toast.success('Registro modificado correctamente!')   
    }  

}
