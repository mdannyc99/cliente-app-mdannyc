import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { Producto } from '../interfaces/producto.interface';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html'
})
export class ProductoFormComponent implements OnInit {


  productoNew: Producto = {
    id: 0,
    nombre: ''
  }

  constructor(private servicio:ProductoService,private router:Router,private usuarioService:UsuarioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.usuarioService.token == ""){
      swal("No esta autenticado","usuario no autenticado","info");
      this.router.navigate(['/login'])
    }

    this.activatedRoute.paramMap.subscribe(
      params => {
        let id = params.get('id');
        if (id){
          this.servicio.getProducto(parseInt(id)).subscribe(
            resp => {
              this.productoNew = resp;
            }
          );
        }
      }
    );
  }

  guardarProducto():void{
    this.servicio.guardarProducto( this.productoNew ).subscribe(
      resp=> {
        console.log("esto responde",resp);
        swal("Nuevo producto",`${this.productoNew.nombre} creado con éxito`,'success');
        this.router.navigate(['/productos']);
      },
      error=> {
        console.log("error: ",error);
        swal("Error",`error al crear producto ${error.status}`,'error');
      }

    )
  }

  editarProducto():void{
    this.servicio.update( this.productoNew ).subscribe(
      resp=> {
        console.log("esto responde",resp);
        swal("Producto editado",`${this.productoNew.nombre} editado con éxito`,'success');
        this.router.navigate(['/productos']);
      },
      error=> {
        console.log("error: ",error);
        swal("Error",`error al editar el producto ${error.status}`,'error');
      }

    )
  }

}
