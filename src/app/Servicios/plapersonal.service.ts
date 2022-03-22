import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Parametro } from '../Clases/parametro';
import { Plapersonal } from '../Clases/plapersonal';

@Injectable({
  providedIn: 'root'
})
export class PlapersonalService {

  private URL_SISTEMA: string = Parametro.SISTEMA_URL + "personal";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) {

  }


  getplapersonal(codempresa:string,sede:string,zona:string): Observable<Plapersonal[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/personal";
    return this.http.get<Plapersonal[]>(`${baseUrl1}/${codempresa}/${sede}/${zona}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
}
