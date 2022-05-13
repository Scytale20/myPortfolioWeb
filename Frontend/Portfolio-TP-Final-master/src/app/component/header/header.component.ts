import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatosService } from 'src/app/servicios/service.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  dataPortfolio: any;
  headerForm:FormGroup;
  

  constructor(private datosPortfolio:DatosService, private formbuilder: FormBuilder) {
    this.headerForm = this.formbuilder.group({
      id:[''],
      name:[''],
      backImage:[''],
      profImage:[''], 
      tittle:[''],
      logo:[''],
      tituloLogo:[''],
    })
   }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.dataPortfolio=data;
    })
  }

  onSubmit(){
    console.log(this.headerForm.value)
  }

}
