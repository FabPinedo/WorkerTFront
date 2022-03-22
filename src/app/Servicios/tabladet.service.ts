import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Parametro } from '../Clases/parametro';
import { Tabladet } from '../Clases/tabladet';

@Injectable({
  providedIn: 'root'
})
export class TabladetService {

  private URL_SISTEMA: string = Parametro.SISTEMA_URL + "tabladet";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) {

  }



  getsedes(): Observable<Tabladet[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/sedes";
    return this.http.get<Tabladet[]>(`${baseUrl1}`).pipe(
      catchError(e=>{
      Swal.fire(e.error.Mensaje,e.error.Mensaje,"error" );
      return throwError(e)
    })
    )
  }
  getzonas(): Observable<Tabladet[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/zonas";
    return this.http.get<Tabladet[]>(`${baseUrl1}`).pipe(
      catchError(e=>{
      Swal.fire(e.error.Mensaje,e.error.Mensaje,"error" );
      return throwError(e)
    })
    )
  }
}
