import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Lote } from '../Clases/lote';
import { Parametro } from '../Clases/parametro';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  private URL_SISTEMA: string = Parametro.SISTEMA_URL + "lote";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) {

  }



  getlotes(): Observable<Lote[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/listado";
    return this.http.get<Lote[]>(`${baseUrl1}`).pipe(
      catchError(e=>{
      Swal.fire(e.error.Mensaje,e.error.Mensaje,"error" );
      return throwError(e)
    })
    )
  }
}
