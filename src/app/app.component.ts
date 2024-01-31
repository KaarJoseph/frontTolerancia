import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PracticaMicroservicios';
  constructor(){

  }
  ngOnInit(){
    
  }
  BotonI=true;
  Inicio=true;

  ocultar(){
    this.Inicio=false;
    this.BotonI=false;
  }
  aparecer(){
    this.BotonI=true;
    this.Inicio=true;
  }

}
