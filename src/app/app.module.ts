import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent} from './footer/footer.component';
import { HeaderComponent} from './header/header.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { JuegoComponent } from './juego/juego.component';
import {ClienteService} from './clientes/cliente.service';
import {JuegoService} from './juego/juego.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CompaniaComponent } from './compania/compania.component';
import { CompaniaService } from './compania/compania.service';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { FormComponent as ClienteFormComponent } from './clientes/clienteForm.component';
import { FormsModule} from '@angular/forms';
import { FormComponent as JuegoFormComponent} from './juego/juegoForm.component'
import { componentFactoryName } from '@angular/compiler';
import { CompaniaFormComponent } from './compania/compania-form.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
const ROUTES:Routes = [
  {path: '', redirectTo: '', pathMatch:'full'},
  {path: 'clientes', component: ClientesComponent},
  {path: 'juegos', component: JuegoComponent},
  {path: 'companias', component: CompaniaComponent},
  {path: 'juegos/form', component:JuegoFormComponent},
  {path: 'clientes/form', component:ClienteFormComponent},
  {path: 'juegos/form/:id', component:JuegoFormComponent},
  {path: 'companias/form', component:CompaniaFormComponent},
  {path: 'companias/form/:id', component:CompaniaFormComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    JuegoComponent,
    CompaniaComponent,
    AlertComponent,
    JuegoFormComponent,
    ClienteFormComponent,
    CompaniaFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ClienteService, JuegoService, CompaniaService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
