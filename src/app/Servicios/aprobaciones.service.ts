import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Anios } from '../Clases/anios';
import { Aprobaciones } from '../Clases/aprobaciones';
import { Parametro } from '../Clases/parametro';

@Injectable({
  providedIn: 'root'
})
export class AprobacionesService {

  private URL_SISTEMA: string = Parametro.SISTEMA_URL + "aprobaciones";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) {

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
  getAprobaciones(): Observable<Aprobaciones[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/listado";
    return this.http.get<Aprobaciones[]>(`${baseUrl1}`).pipe(
      catchError(e=>{
      Swal.fire(e.error.Mensaje,e.error.Mensaje,"error" );
      return throwError(e)
    })
    )
  }
  getAprobacionesFiltradas(codempresa:string,anoproceso:string,mesproceso:string): Observable<Aprobaciones[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/filtrado";
    return this.http.get<Aprobaciones[]>(`${baseUrl1}/${codempresa}/${anoproceso}/${mesproceso}`).pipe(
      catchError(e=>{
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      console.log(e)
      return throwError(e)
    })
    )
  }




  guardarAprobacion(aprobacion:Aprobaciones): Observable<Aprobaciones>{
    const baseUrl2 = this.URL_SISTEMA+"/post";
    return this.http.post<Aprobaciones>(baseUrl2,aprobacion,{headers:this.cabezera}).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
  obtenerAprobacion(id: number):Observable<Aprobaciones>{
    const baseUrl3 = this.URL_SISTEMA+"/find/id";
    return this.http.get<Aprobaciones>(`${baseUrl3}/${id}`).pipe(catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }


  EliminarAprobacion(id: number):Observable<Aprobaciones>{
    const baseUrl5 = this.URL_SISTEMA+"/find/id";
    return this.http.delete<Aprobaciones>(`${baseUrl5}/${id}`).pipe(catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
}
