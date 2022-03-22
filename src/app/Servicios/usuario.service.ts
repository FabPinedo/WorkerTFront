import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Parametro } from '../Clases/parametro';
import { Usuario } from '../Clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL_SISTEMA: string = Parametro.SISTEMA_URL + "usuario";
  private baseUrlinfouser = "http://190.187.4.81:28080/sitia/InfoUser";

  private _usuario: Usuario;

  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  info:any[]

  constructor(private http: HttpClient) {}

  getUsuarioSession(): string |null{
    if (JSON.parse(sessionStorage.getItem('usuario')||'{}')) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')||'{}') as Usuario;
      if (this._usuario.usuario != null) {
        return this._usuario.usuario;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  getUsuarioByUsuario(usuario: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URL_SISTEMA}/find/usuario/${usuario}`)
  }

  validarUsuarios(usuario:Usuario):Observable<Usuario>{
    const baseUrl1 = this.URL_SISTEMA
    return this.http.get<Usuario>(`${baseUrl1}/${usuario.usuario}/${usuario.password}`);
  }

  //METODOS PARA SITIA
  getcantidadActivos(id:number): Observable<any[]>{
    const baseUrl1=this.baseUrlinfouser+"/cantInventariado"
    return this.http.get<any[]>(`${baseUrl1}/${id}`);
  }
  getInfoTorta(id:number): Observable<any[]>{
    const baseUrl1=this.baseUrlinfouser+"/Torta"
    return this.http.get<any[]>(`${baseUrl1}/${id}`);
  }
  getInfoBarra(id:number): Observable<any[]>{
    const baseUrl1=this.baseUrlinfouser+"/Barra"
    return this.http.get<any[]>(`${baseUrl1}/${id}`);
  }
  //METODOS PARA PERFILCOMPONENT

  //METODOS PARA USUARIOCOMPONENT

  getListadoUsers():Observable<Usuario[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/listado"
    return this.http.get<Usuario[]>(`${baseUrl1}`);
  }
  getUsuarioByRUC(ruc:string): Observable<Usuario[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/ruc";
    return this.http.get<Usuario[]>(`${baseUrl1}/${ruc}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
  getUsuariosCambio(): Observable<Usuario[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/usuarios/contra";
    return this.http.get<Usuario[]>(`${baseUrl1}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }


  getUsuarioByName(name:string): Observable<Usuario[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/name";
    return this.http.get<Usuario[]>(`${baseUrl1}/${name}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
  getUsuarioBycod(codusuario:string): Observable<Usuario[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/codusuario";
    return this.http.get<Usuario[]>(`${baseUrl1}/${codusuario}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
 
  crearUsuario(Usuario:Usuario): Observable<Usuario>{
    const baseUrl2 = this.URL_SISTEMA+"/post";
    return this.http.post<Usuario>(baseUrl2,Usuario,{headers:this.cabezera}).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e);
      })
    )
  }
  obtenerUsuario(usuario:Usuario):Observable<Usuario>{
    const baseUrl3 = this.URL_SISTEMA+"/find/codusuario";
    return this.http.get<Usuario>(`${baseUrl3}/${usuario.usuario}`).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e);
      })
    )
  }
  modificarUsuario(usuario:Usuario):Observable<Usuario>{
    const baseUrl4 = this.URL_SISTEMA+"/find/codusuario";
    return this.http.put<Usuario>(`${baseUrl4}/${usuario.usuario}`,usuario,{headers:this.cabezera}).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e);
      })
    )
  }
  eliminarUsuario(usuario:Usuario):Observable<Usuario>{
    const baseUrl5=this.URL_SISTEMA+"/find/codusuario";
    return this.http.delete<Usuario>(`${baseUrl5}/${usuario.usuario}`).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e);
      })
    )
  }

}
