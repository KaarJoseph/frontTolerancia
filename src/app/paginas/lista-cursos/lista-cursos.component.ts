import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Curso } from 'src/app/domain/curso';
import { Profesor } from 'src/app/domain/profesor';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { ClienteComponent } from '../cliente/cliente.component';
import { Cliente } from 'src/app/domain/cliente';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent implements OnInit{
  cedula = '';
  nombre = '';
  apellido = '';
  correo ='';
  contrasena='';
  celular = '';
  direccion = '';
  dato:String='';
  estu: Cliente = new Cliente();
  curso: Curso = new Curso();
  profesor: Profesor = new Profesor();
  listadoCursoWS: any;
  dataSourceF: any;
  selectedCurso: Curso | null = null;
  displayedColumns: string[]=['Nombre','Horas','Cedula','Profesor','Accion'];
  dataSource = this.servicio.getAllCursos();
  @ViewChild(MatTable)
  table!: MatTable<Curso>;
  constructor(private servicio: ServicioService,private router: Router, private app: AppComponent){
    this.listadoCursoWS = this.servicio.getAllCursos();
    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if (params) {
      this.curso = new Curso();
      this.curso = params['curso']
    }
  }
  ngOnInit(){
  setTimeout(() => {
    this.visualizar() // Realizar el cambio de forma asincrónica
  });
}
  visualizar() {
    this.listadoCursoWS=this.servicio.getAllCursos()
    const currentUrl = this.router.url;
    if (currentUrl == '/pagina/lista') {
      this.app.ocultar()
    }
  }
  async guardarWS(cur: Cliente) {
    
    
  }
  incribir(curso: Curso){
    this.dato=ClienteComponent.cliente2.cedula
    console.log(this.dato)
    console.log(curso.id)
    this.estu.idCurso=curso.id
    this.servicio.actualizar(this.buscar(this.dato));
  }
  buscar(cedula: String){
      this.servicio.buscarEstudiante(cedula).subscribe(data=>{
        console.log(data)
        this.estu.cedula=data.cedula
        this.estu.nombre=data.nombre
        this.estu.apellido=data.apellido
        this.estu.correo=data.correo
        this.estu.contrasena=data.contraseña
        this.estu.celular=data.celular
        this.estu.direccion=data.direccion
        console.log(this.estu)
        return this.estu;
      })
      return this.estu
    } 
  buscar3(pro: String){
    this.servicio.buscar(pro).subscribe(data=>{
      console.log(data)
      this.apellido = data.apellido;
      this.correo =data.correo;
      this.contrasena=data.contrasena;
      this.celular = data.celular;
      this.direccion = data.direccion;
      console.log(pro)
      return pro;
    })
  }
}
