import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDetailComponent } from '../cliente/cliente-detail/cliente-detail.component';
import { ClienteFormComponent } from '../cliente/cliente-form/cliente-form.component';
import { MainComponent } from '../cliente/main/main.component';
import { ProductoFormComponent } from '../producto/producto-form/producto-form.component';
import { ProductoListaComponent } from '../producto/producto-lista/producto-lista.component';
import { LoginComponent } from '../usuario/login/login.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    pathMatch:'full'
  },
  {
    path:'productos',
    component: ProductoListaComponent
  },
  {
    path:'cliente/new',
    component: ClienteFormComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'cliente/edit/:id',
    component:ClienteFormComponent
  },
  {
    path:'cliente/view/:id',
    component: ClienteDetailComponent
  },
  {
    path: 'producto/new',
    component: ProductoFormComponent,
    pathMatch:'full'
  },
  {
    path:'producto/edit/:id',
    component: ProductoFormComponent
  },
  {
    path:'**',
    redirectTo:''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
