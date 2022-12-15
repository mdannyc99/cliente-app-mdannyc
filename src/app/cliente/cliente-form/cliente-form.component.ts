import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../interfaces/cliente.interface';
import { Region } from '../interfaces/region.interface';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styles: [
  ]
})
export class ClienteFormComponent implements OnInit {

  region!: Region;

  clienteNew: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    createdAt: null,
    imagen: '',
    region: this.region
  }

  regiones!:Region[];

  constructor( private servicio:ClienteService,private router:Router,private usuarioService:UsuarioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    if(this.usuarioService.token == ""){
      swal("No esta autenticado","usuario no autenticado","info");
      this.router.navigate(['/login'])
    }else{

      this.servicio.getRegiones().subscribe(
        resp => { this.regiones = resp; console.log(this.regiones); }

      );
    }

    this.activatedRoute.paramMap.subscribe(
      params => {
        let id = params.get('id');
        if (id){
          this.servicio.getCliente(parseInt(id)).subscribe(
            resp => {
              this.clienteNew = resp;
            }
          );
        }
      }
    );

  }

  compararRegion(o1:Region,o2:Region):boolean{
    if( o1=== undefined  && o2 === undefined){
      return true;
    }

    return o1===null || o2===null || o1===undefined ||
    o2=== undefined ? false: o1.id ===o2.id;
  }


  guardarCliente():void{
    this.servicio.guardarCliente( this.clienteNew ).subscribe(
      resp=> {
        console.log("esto responde",resp);
        swal("Nuevo Cliente",`${this.clienteNew.nombre} creado con éxito`,'success');
        this.router.navigate(['/']);
      },
      error=> {
        console.log("error: ",error);
        swal("Error",`error al crear cliente ${error.status}`,'error');
      }

    )
  }

  editarCliente():void{
    this.servicio.update( this.clienteNew ).subscribe(
      resp=> {
        console.log("esto responde",resp);
        swal("Cliente editado",`${this.clienteNew.nombre} editado con éxito`,'success');
        this.router.navigate(['']);
      },
      error=> {
        console.log("error: ",error);
        swal("Error",`error al editar cliente ${error.status}`,'error');
      }

    )
  }


}
