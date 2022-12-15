import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  username!: string;

  constructor(public servicioUsuario: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.username = this.servicioUsuario.usuario.username;
    this.servicioUsuario.logOut();
    swal("Has cerrado sesión",`Vuelve pronto, ${this.username}`, "success");
    this.router.navigateByUrl('login');
  }

}
