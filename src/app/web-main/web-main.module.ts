import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ClienteModule } from '../cliente/cliente.module';
import { RouterModule } from '@angular/router';

// En este módulo se declaran componentes propios de la web: footer, sidebar, navbar

@NgModule({
  declarations: [MenuComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    ClienteModule
  ]
})
export class WebMainModule { }
