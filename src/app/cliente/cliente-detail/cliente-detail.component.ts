import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../interfaces/cliente.interface';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styles: [
  ]
})
export class ClienteDetailComponent implements OnInit {


  cliente!: Cliente;
  selectedImg!:File;

  constructor(private servicioCliente: ClienteService, private activatedRoute: ActivatedRoute, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    if (this.usuarioService.token == ""){
      swal("No estás autenticado","Inicia sesión","info");
      this.router.navigateByUrl('/login');
    }else{

      this.activatedRoute.paramMap.subscribe(
        params => {
          let id: number = parseInt(params.get('id')!);
          if (id){
            this.servicioCliente.getCliente(id).subscribe(
              res => {
                this.cliente = res;
                console.log(this.cliente);
              }
            );
          }
        }
      );
    }
    }


  seleccionarImagen(event:any): void {
    this.selectedImg = event.target.files[0];
    console.log(this.selectedImg);
  }

  subirImagen(): void {
    if (!this.selectedImg){
      swal("Error", "Debe seleccionar una imágen", "error");
    }else{
      this.servicioCliente.subirImagen(this.selectedImg, this.cliente.id).subscribe(
        event => {
          if (event.type === HttpEventType.Response){
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;
            swal("Imágen subida con éxito", response.mensaje, "success");
          }
        }
      );
    }
  }

}
