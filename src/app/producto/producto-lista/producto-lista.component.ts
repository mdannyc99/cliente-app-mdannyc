import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { Producto } from '../interfaces/producto.interface';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html'
})
export class ProductoListaComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private servicioProducto: ProductoService, public servicioUsuario: UsuarioService) { }

  ngOnInit(): void {
    this.servicioProducto.mostrarProducto().subscribe(
      res => {
        this.productos = res;
        console.log(this.productos);
      }
    );
  }

  borrarProducto(producto: Producto): void {
    swal({
      title: "Confirme su acción",
      text: `¿Estás seguro que quieres borrar el producto ${producto.nombre} ?`,
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
        this.servicioProducto.delete(producto.id).subscribe(
          resp => {
            this.productos = this.productos.filter(prod => prod !== producto)
            swal("Producto borrado",`El producto ${producto.nombre} ha sido borrado con éxito`, "info");
          }
        )
      }
    }));
  }

}
