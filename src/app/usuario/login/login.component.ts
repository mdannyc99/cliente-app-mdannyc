import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Usuario } from '../clases/usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  usuario: Usuario = {
    username: '',
    password: '',
    enabled: false,
    roles: [],
    nombre: '',
    apellido: '',
    email: ''
  }

  constructor(private servicioUsuario: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    if(this.servicioUsuario.token){
      swal("Aviso","Ya estás autenticado", "info");
      this.router.navigateByUrl('');
    }
  }

  login(): void{
    console.log("login()")
    this.servicioUsuario.login(this.usuario).subscribe(
      res => {
        console.log(res.access_token);
        this.servicioUsuario.guardarToken(res.access_token);
        this.servicioUsuario.guardarUsuario(res.access_token);

        swal('Login con éxito', `Bienvenidx, ${this.usuario.username}`, 'success');

        this.router.navigateByUrl('');
      },
      err => {
        console.log(err);
        swal('Error de login', `${err.error.error} : ${err.error.error_description}`, 'error');
      }
    )
  }

}




/*

import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  usuario: Usuario = {
    username: '',
    password: '',
    enabled: false,
    roles: []
  }

  constructor() { private servicioUsuario: UsuarioService }

  ngOnInit(): void {
  }

  login(): void{
    this.servicioUsuario.login(this.usuario).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )

    );

  }

}

*/
