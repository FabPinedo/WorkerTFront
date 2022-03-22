import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Conceptopermisos } from '../Clases/conceptopermisos';
import { Parametro } from '../Clases/parametro';

@Injectable({
  providedIn: 'root'
})
export class ConceptopermisoService {

  private URL_SISTEMA: string = Parametro.SISTEMA_URL + "conceptoPermisos";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) {

  }


  getPermisos(): Observable<Conceptopermisos[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/listado";
    return this.http.get<Conceptopermisos[]>(`${baseUrl1}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
}
