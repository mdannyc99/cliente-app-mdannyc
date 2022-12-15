import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioModule } from '../usuario/usuario.module';



@NgModule({
  declarations: [ProductoFormComponent, ProductoListaComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UsuarioModule
  ],
  exports: [
    ProductoFormComponent,
    ProductoListaComponent
  ]
})
export class ProductoModule { }
