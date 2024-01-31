import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Profesor } from 'src/app/domain/profesor';
import { MatTable } from '@angular/material/table';
import { ServicioService } from 'src/app/servicios/servicio.service';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss']
})
export class ProfesorComponent implements OnInit {
  tabla=false;
  inputCedula: string = '#bbbabac5';
  inputNombre: string = '#bbbabac5';
  inputApellido: string = '#bbbabac5';
  inputDireccion: string = '#bbbabac5';
  profesor: Profesor = new Profesor();
  listadoProfesorWS: any;
  dataSourceF: any;
  selectedProfesor: Profesor | null = null;// en este se puede guardar profesor o nulo y se inicializa en nulo
  displayedColumns: string[] = ['Cedula', 'Nombre', 'Apellido', 'Celular', 'Correo', 'Direccion','Accion'];
  dataSource = this.servicio.getAllProfesores();
  @ViewChild(MatTable)
  table!: MatTable<Profesor>;
  constructor(private servicio: ServicioService,
    private router: Router, private app: AppComponent) {
    this.listadoProfesorWS = this.servicio.getAllProfesores();
    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if (params) {
      this.profesor = new Profesor();
      this.profesor = params['profesor']
    }
  }

  ngOnInit(){
    this.listadoProfesorWS = this.servicio.getAllProfesores(); //aparece la lista
    this.dataSource = this.listadoProfesorWS;
  setTimeout(() => {
    this.visualizar() // Realizar el cambio de forma asincrónica
  });
}
  visualizar() {
    const currentUrl = this.router.url;
    if (currentUrl == '/pagina/profesor') {
      this.app.ocultar()
    }
  }
  //acciones
  //guardar cliente
  guardarWS() {
    this.vacio();
    if (this.vacio() == false) {
      alert("Error 98: Campos vacios") //validacion de espacios vacios
    } else {
      console.log(this.profesor)
      this.servicio.saveProfesor(this.profesor).subscribe(data => {
        if (data.codigo == 99) {
          alert("Codigo: " + data.codigo + " " + data.mensaje);
          this.inputCedula = '#e93c3c'
        } else {
          this.selectedProfesor = null;//sirve para limpiar el formulario despues de guardar
          this.colorOriginal();
          console.log("profesor/guardado" + this.profesor);
          this.tabla=true
          this.ngOnInit();
          this.profesor = new Profesor();
        }
      });
    }
  }
  editarWS(profesor: Profesor) {
    this.selectedProfesor = profesor;
    /*
    Object.assign hace una copia del profesor para tabajar con una
    entidad independiente para no afectar a la tabla original sin
    pasar antes de la funcion guardarWS 
    */
    this.profesor = Object.assign({}, profesor);  // Copia el profesor seleccionado en el formulario
  }
  borrarWS(profesor: Profesor) {
    /*es un mensaje de confirmacion antes de realizar la 
    accion de borrar, cuando se acepte se borrar caso contrario 
    no se hara nada*/
    const confirmacion = window.confirm("¿Estás seguro de realizar esta acción?");
    if (confirmacion) {
      this.servicio.deleteD(profesor.cedula).subscribe(() => {
        this.ngOnInit();
        alert("Cliente borrado exitosamente");
      })
    }
  }
  colorOriginal() {
    this.inputCedula = '#bbbabac5';
    this.inputNombre = '#bbbabac5';
    this.inputApellido = '#bbbabac5';
    this.inputDireccion = '#bbbabac5';
  }
  vacio() {
    var bandera: Boolean;
    bandera = true;
    if (this.profesor.nombre == "") {
      this.inputNombre = '#e93c3c'
      bandera = false;
    }
    if (this.profesor.apellido == "") {
      this.inputApellido = '#e93c3c'
      bandera = false;
    }
    if (this.profesor.direccion == "") {
      this.inputDireccion = '#e93c3c'
      bandera = false;
    }
    if (this.profesor.nombre == "" && this.profesor.apellido == "" && this.profesor.direccion == "") {
      this.inputNombre = '#e93c3c'
      this.inputApellido = '#e93c3c'
      this.inputDireccion = '#e93c3c'
      bandera = false;
    }
    else {
      bandera = true;
      return bandera;
    }
    return bandera;
  }
}
