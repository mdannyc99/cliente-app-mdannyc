import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { FormsModule } from '@angular/forms';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { RouterModule } from '@angular/router';
import { UsuarioModule } from '../usuario/usuario.module';



@NgModule({
  declarations: [MainComponent, ClienteFormComponent, ClienteDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UsuarioModule
  ],
  exports: [
    MainComponent,
    ClienteFormComponent
  ]
})
export class ClienteModule { }
