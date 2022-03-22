import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Empresas } from '../Clases/empresas';
import { Parametro } from '../Clases/parametro';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private URL_SISTEMA: string = Parametro.SISTEMA_URL + "empresa";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) {

  }



  getEmpresa(): Observable<Empresas[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/listado";
    return this.http.get<Empresas[]>(`${baseUrl1}`).pipe(
      catchError(e=>{
      Swal.fire(e.error.Mensaje,e.error.Mensaje,"error" );
      return throwError(e)
    })
    )
  }
  getEmpresabyUsu(usuario:string): Observable<Empresas[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/listado";
    return this.http.get<Empresas[]>(`${baseUrl1}/${usuario}`).pipe(
      catchError(e=>{
      Swal.fire(e.error.Mensaje,e.error.Mensaje,"error" );
      return throwError(e)
    })
    )
  }

}
