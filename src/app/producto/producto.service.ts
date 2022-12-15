import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { Producto } from './interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlBase:string="http://localhost:8087/api/productos";

  constructor(private http:HttpClient, private servicioUsuario:UsuarioService) { }

  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})


  addAuthorizationHeader():any{
    let token = this.servicioUsuario.token;
    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer '+token)
    }

    return this.httpHeaders;
  }


  mostrarProducto():Observable<Producto[]>{
    const url = this.urlBase
    return this.http.get<Producto[]>(url);
  }

  guardarProducto(producto: Producto):Observable<Producto>{
    const url = this.urlBase;
    return this.http.post<Producto>(url, producto, {headers: this.addAuthorizationHeader() });
  }

  getProducto(id:number):Observable<Producto>{
    return this.http.get<Producto>(`${this.urlBase}/${id}`,{headers: this.addAuthorizationHeader() });
  }

  update(producto: Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.urlBase}/${producto.id}`, producto, {headers: this.addAuthorizationHeader() });
  }

  delete(id:number):Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlBase}/${id}`,{headers: this.addAuthorizationHeader() });
  }






}
