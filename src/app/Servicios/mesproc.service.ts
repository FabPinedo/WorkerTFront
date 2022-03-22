import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Anios } from '../Clases/anios';
import { Mesproc } from '../Clases/mesproc';
import { Parametro } from '../Clases/parametro';

@Injectable({
  providedIn: 'root'
})
export class MesprocService {

  private URL_SISTEMA: string = Parametro.SISTEMA_URL + "mesProc";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) {

  }


  getMesProc(codempresa:string,anio:string): Observable<Mesproc[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find";
    return this.http.get<Mesproc[]>(`${baseUrl1}/${codempresa}/${anio}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
  getanios(codempresa:string): Observable<Anios[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/anios";
    return this.http.get<Anios[]>(`${baseUrl1}/${codempresa}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
}
