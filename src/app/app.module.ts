import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './paginas/cliente/cliente.component';
import { ProfesorComponent } from './paginas/profesor/profesor.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { CursoComponent } from './paginas/curso/curso.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './paginas/menu/menu.component';
import { FormsModule } from '@angular/forms';
//materials
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ListaCursosComponent } from './paginas/lista-cursos/lista-cursos.component';
import { EmailComponent } from './paginas/email/email.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ProfesorComponent,
    InicioComponent,
    CursoComponent,
    MenuComponent,
    ListaCursosComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
