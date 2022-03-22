import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Parametro } from '../Clases/parametro';
import { Registrotareorefri } from '../Clases/registrotareorefri';

@Injectable({
  providedIn: 'root'
})
export class RegistrotareorefriService {

  private URL_SISTEMA: string = Parametro.SISTEMA_URL + "tareowebrefri";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) {

  }


  getRegistroRefritotal(): Observable<Registrotareorefri[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/listado";
    return this.http.get<Registrotareorefri[]>(`${baseUrl1}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
  getRegistroRefritotalbyid(id:number,fecha:string): Observable<Registrotareorefri[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/listado/id";
    return this.http.get<Registrotareorefri[]>(`${baseUrl1}/${id}/fecha/${fecha}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }

  getRegistroRefri(id:number): Observable<Registrotareorefri>{
    const baseUrl1 = this.URL_SISTEMA+"/find/id";
    return this.http.get<Registrotareorefri>(`${baseUrl1}/${id}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }

  postregistro(registro:Registrotareorefri): Observable<Registrotareorefri>{
    const baseUrl1 = this.URL_SISTEMA+"/post";
    return this.http.post<Registrotareorefri>(baseUrl1,registro,{headers:this.cabezera}).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }

    postregistroListado(registros:Registrotareorefri[]): Observable<Registrotareorefri[]>{
    const baseUrl1 = this.URL_SISTEMA+"/post/listado";
    return this.http.post<Registrotareorefri[]>(baseUrl1,registros,{headers:this.cabezera}).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
    eliminarregistro(id:number): Observable<Registrotareorefri>{
    const baseUrl1 = this.URL_SISTEMA+"/find/id";
    return this.http.delete<Registrotareorefri>(`${baseUrl1}/${id}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
}
