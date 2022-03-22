import { map } from '@amcharts/amcharts5/.internal/core/util/Array';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Fechaproceso } from '../Clases/fechaproceso';
import { Parametro } from '../Clases/parametro';
import { Registroaprobar } from '../Clases/registroaprobar';

import { Registrotareo } from '../Clases/registrotareo';

@Injectable({
  providedIn: 'root'
})
export class RegistrotareoService {
  private URL_SISTEMA: string = Parametro.SISTEMA_URL + "tareoweb";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) {

  }


  getRegistrototal(): Observable<Registrotareo[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/listado";
    return this.http.get<Registrotareo[]>(`${baseUrl1}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
  getRegistroAprobar(codempresa:string, anio:string,mes:string,codsede:string): Observable<Registroaprobar[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/empresa";
    return this.http.get<Registroaprobar[]>(`${baseUrl1}/${codempresa}/anio/${anio}/mes/${mes}/sede/${codsede}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }

  getRegistro(id:number): Observable<Registrotareo[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find/id";
    return this.http.get<Registrotareo[]>(`${baseUrl1}/${id}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }


  crearfechaprocesoNuevosRegistros(codpersonal:string,codempresa:string,codusuario:string,anio:string,mes:string,lote:string,sede:string): Observable<Registrotareo[]>{
    const baseUrl1 = this.URL_SISTEMA+"/find";
    return this.http.get<Registrotareo[]>(`${baseUrl1}/personal/${codpersonal}/empresa/${codempresa}/usuario/${codusuario}/anio/${anio}/mesproc/${mes}/lote/${lote}/sede/${sede}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }

  postregistro(registro:Registrotareo): Observable<Registrotareo>{
    const baseUrl1 = this.URL_SISTEMA+"/post";
    return this.http.post<Registrotareo>(baseUrl1,registro,{headers:this.cabezera}).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }

    postregistroListado(registros:Registrotareo[]): Observable<Registrotareo[]>{
    const baseUrl1 = this.URL_SISTEMA+"/post/listado";
    return this.http.post<Registrotareo[]>(baseUrl1,registros,{headers:this.cabezera}).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
    eliminarregistro(id:number): Observable<Registrotareo>{
    const baseUrl1 = this.URL_SISTEMA+"/find/id";
    return this.http.delete<Registrotareo>(`${baseUrl1}/${id}`).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
}
