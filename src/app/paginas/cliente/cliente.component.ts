import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Cliente } from 'src/app/domain/cliente';
import { MatTable } from '@angular/material/table';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  tabla=false;
  boton=false;
  inputCedula: string = '#bbbabac5';
  inputNombre: string = '#bbbabac5';
  inputApellido: string = '#bbbabac5';
  inputDireccion: string = '#bbbabac5';
  cliente: Cliente = new Cliente();
  static cliente2: Cliente=new Cliente();
  listadoClienteWS: any;
  dataSourceF: any;
  selectedCliente: Cliente | null = null;// en este se puede guardar cliente o nulo y se inicializa en nulo
  displayedColumns: string[] = ['Cedula', 'Nombre', 'Apellido', 'Celular', 'Correo', 'Direccion','Accion'];
  dataSource = this.servicio.getAll();
  @ViewChild(MatTable)
  table!: MatTable<Cliente>;
  constructor(private servicio: ServicioService,
    private router: Router, private app: AppComponent) {
    this.listadoClienteWS = this.servicio.getAll();
    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if (params) {
      this.cliente = new Cliente();
      this.cliente = params['cliente']
    }
  }

  ngOnInit(){
    this.listadoClienteWS = this.servicio.getAll(); //aparece la lista
    this.dataSource = this.listadoClienteWS;
  setTimeout(() => {
    this.visualizar() // Realizar el cambio de forma asincrónica
  });
}
  visualizar() {
    const currentUrl = this.router.url;
    if (currentUrl == '/pagina/cliente') {
      this.app.ocultar()
    }
  }
  //acciones
  //guardar cliente
  guardarWS(client: Cliente) {
    this.vacio();
    if (this.vacio() == false) {
      alert("Error 98: Campos vacios") //validacion de espacios vacios
    } else {
      ClienteComponent.cliente2=this.cliente;
      console.log(this.cliente+"ahora soy el cliente de componente: "+ ClienteComponent.cliente2)
      this.servicio.save(client).subscribe(data => {
        if (data.codigo == 99) {
          alert("Codigo: " + data.codigo + " " + data.mensaje);
          this.inputCedula = '#e93c3c'
        } else {
          this.selectedCliente = null;//sirve para limpiar el formulario despues de guardar
          this.colorOriginal();
          console.log("cliente/guardado" + this.cliente);
          this.tabla=true
          this.boton=true
          this.ngOnInit();
          this.cliente = new Cliente();
        }
      });
    }
  }

  agregar(cliente: Cliente){
    this.router.navigate(['pagina/lista'])
  }


  editarWS(cliente: Cliente) {
    this.selectedCliente = cliente;
    /*
    Object.assign hace una copia del cliente para tabajar con una
    entidad independiente para no afectar a la tabla original sin
    pasar antes de la funcion guardarWS 
    */
    this.cliente = Object.assign({}, cliente);  // Copia el cliente seleccionado en el formulario
  }
  borrarWS(cliente: Cliente) {
    /*es un mensaje de confirmacion antes de realizar la 
    accion de borrar, cuando se acepte se borrar caso contrario 
    no se hara nada*/
    const confirmacion = window.confirm("¿Estás seguro de realizar esta acción?");
    if (confirmacion) {
      this.servicio.delete(cliente.cedula).subscribe(() => {
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
    if (this.cliente.nombre == "") {
      this.inputNombre = '#e93c3c'
      bandera = false;
    }
    if (this.cliente.apellido == "") {
      this.inputApellido = '#e93c3c'
      bandera = false;
    }
    if (this.cliente.direccion == "") {
      this.inputDireccion = '#e93c3c'
      bandera = false;
    }
    if (this.cliente.nombre == "" && this.cliente.apellido == "" && this.cliente.direccion == "") {
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


/*
this.router.navigate(['paginas/listacontactos'])*/ 