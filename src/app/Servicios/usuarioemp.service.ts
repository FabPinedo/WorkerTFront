import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Parametro } from '../Clases/parametro';
import { Usuarioemp } from '../Clases/usuarioemp';

@Injectable({
  providedIn: 'root'
})
export class UsuarioempService {

  private URL_SISTEMA: string = Parametro.SISTEMA_URL +"usuarioemp";
  private cabezera =new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) {

  }



  getUsuarioEmp(): Observable<Usuarioemp[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/listado";
    return this.http.get<Usuarioemp[]>(`${baseUrl1}`).pipe(
      catchError(e=>{
      Swal.fire(e.error.Mensaje,e.error.Mensaje,"error" );
      return throwError(e)
    })
    )
  }
}
