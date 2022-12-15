import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/clases/usuario';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../interfaces/cliente.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  clientes: Cliente[] = [];
  imageSrc!: string;

  constructor(private servicioCliente: ClienteService, public servicioUsuario: UsuarioService) { }

  ngOnInit(): void {

    this.imageSrc = 'assets/avatar.png';

    this.servicioCliente.mostrarCliente().subscribe(
      res => {
        this.clientes = res;
        console.log(this.clientes);
      }
    );
  }

  borrarCliente(cliente: Cliente): void {
    swal({
      title: "Confirme su acción",
      text: `¿Estás seguro que quieres borrar al cliente ${cliente.nombre} ${cliente.apellido} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-info',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result => {
      if (result.value){
        this.servicioCliente.delete(cliente.id).subscribe(
          resp => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal("Cliente borrado",`El cliente ${cliente.nombre} ${cliente.apellido} ha sido borrado con éxito`, "info");
          }
        )
      }
    }));
  }

}
