import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoteService } from 'src/app/Servicios/lote.service';
@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.css']
})
export class LotesComponent implements OnInit {
  nroTotal:number=0
  lotescol: string[] = ['empresa','lote','galpon','granja','idgranja','zonaoperacion','fecharegistro','fechaencasetado','fechacierre','estado'];
  lotesdata = new MatTableDataSource<any>();

  @ViewChild('closebutton') modal: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(

    private loteservice:LoteService){

    }
  ngOnInit(): void {
    this.obtenerData();
    this.onListUsuarios();
    this.verificarCredenciales();
  }
  obtenerData(){
    //var usuario = JSON.parse(sessionStorage.getItem('usuario')||'{}');
    //this.usuarioPanel=usuario.usuario
  //this.permisos=JSON.parse(sessionStorage.getItem('permisos')||'{}');

   }
  verificarCredenciales(){
   /* for(let permiso of this.permisos){
      if(permiso.desfuncion=="Usuarios"){
        if(permiso.escperm==0){
          this.isDisable=true
        }
      }
    }*/
   }

  onListUsuarios(){
    this.nroTotal=0
    this.loteservice.getlotes().subscribe((response:any)=>{
      this.lotesdata.data=response
      this.nroTotal= this.lotesdata.data.length
      this.lotesdata.paginator=this.paginator
    });
  }





}
