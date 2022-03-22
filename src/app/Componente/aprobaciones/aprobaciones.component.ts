import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Anios } from 'src/app/Clases/anios';
import { Aprobaciones } from 'src/app/Clases/aprobaciones';
import { Empresas } from 'src/app/Clases/empresas';
import { Registroaprobar } from 'src/app/Clases/registroaprobar';
import { Registrotareo } from 'src/app/Clases/registrotareo';
import { Submenu } from 'src/app/Clases/submenu';
import { Usuario } from 'src/app/Clases/usuario';
import { AprobacionesService } from 'src/app/Servicios/aprobaciones.service';
import { EmpresaService } from 'src/app/Servicios/empresa.service';
import { MesprocService } from 'src/app/Servicios/mesproc.service';
import { RegistrotareoService } from 'src/app/Servicios/registrotareo.service';
import Swal from 'sweetalert2';



export interface mesvalor {
  mes:string,
  value:string
}
const mesesList:mesvalor[]=[{mes:'Enero',value:'01'},
 {mes:'Febrero',value:'02'},
 {mes:'Marzo',value:'03'},
 {mes:'Abril',value:'04'},
 {mes:'Mayo',value:'05'},
 {mes:'Junio',value:'06'},
 {mes:'Julio',value:'07'},
 {mes:'Agosto',value:'08'},
 {mes:'Setiembre',value:'09'},
 {mes:'Octubre',value:'10'},
 {mes:'Noviembre',value:'11'},
 {mes:'Diciembre',value:'12'}]

 @Component({
  selector: 'app-aprobaciones',
  templateUrl: './aprobaciones.component.html',
  styleUrls: ['./aprobaciones.component.css']
})
export class AprobacionesComponent implements OnInit {
meses:mesvalor[]=mesesList
anios:Anios[]=[]
json_data:Registroaprobar[]=[]
empresas:Empresas[]=[]
permisos:Submenu[]=[]
isDisable=false
public formFiltros: FormGroup;
 //Con material
 aprobacionescol: string[] = ['Opciones', 'dessede', 'estado','usuario', 'fecaprobado'];
 aprobacionesdata = new MatTableDataSource<any>();
 registroscol: string[] = ['empresa', 'personal','nombre','hefe', 'bnoc','he25','he35','hen25','hen35','h100','hn100',
 'falt','vaca','desm','sube','subm','lics','susp','licp','licf','pgoc','psgo'];
 registrosdata = new MatTableDataSource<any>();
 usuarioPanel:string|null;
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 @ViewChild('closebutton') modal: ElementRef;
 @ViewChild('paginatorRegistros', { static: true, read: MatPaginator }) paginatorRegistros: MatPaginator;

 public formAprobacion: FormGroup;
 public selectedTabIndex: number = 0;
 public submitted = false;
 nuevo:boolean;
 nroTotal:number=0
 nroTotalregistros:number=0

 //Antiguo codigo
 constructor(
   private aprobacionservice:AprobacionesService,
   private changeDetectorRefs: ChangeDetectorRef,
   private tareoservice:RegistrotareoService,
   private empresaService:EmpresaService,
   private datePipe: DatePipe,
   private fb: FormBuilder){

   }
 ngOnInit(): void {
   this.obtenerData();
   this.onBuildFormAprobaciones();

   this.onBuildFormFiltros();
   this.onListEmpresas();
   this.verificarCredenciales();

 }
 verificarCredenciales(){
  for(let permiso of this.permisos){
    if(permiso.desfuncion=="Aprobaciones"){
      if(permiso.escperm==0){
        this.isDisable=true
      }
    }
  }
 }
 onBuildFormFiltros() {
  this.formFiltros = this.fb.group({
    empresa: ['', Validators.required],
    anio: ['', Validators.required],
    mes: ['',Validators.required],


  });
}
buscarregistros(){
this.onListAprobaciones();
}

 obtenerData(){
  var usuario = JSON.parse(sessionStorage.getItem('usuario')||'{}');
  this.usuarioPanel=usuario.usuario
this.permisos=JSON.parse(sessionStorage.getItem('permisos')||'{}');

 }

 downloadExcel(){
  var mesproceso=this.formFiltros.controls['mes'].value
  var anoproceso:string=this.formFiltros.controls['anio'].value
  var codempresa:string=this.formFiltros.controls['empresa'].value

let workbook = new Workbook();
let sheet = workbook.addWorksheet('Node-Cheat');
// keep {} where you wan to skip the column
sheet.columns = [
{key:'codempresa',header:'Código empresa'},
{key:'codpersonal',header:'Código personal'},
{key:'nombre',header:'Nombre'},
{key:'hefe',header:'Horas efectivas'},
{key:'he25',header:'he25'},
{key:'he35',header:'he35'},
{key:'hen25',header:'hen25'},
{key:'hen35',header:'hen35'},
{key:'h100',header:'H100'},
{key:'hn100',header:'hn100'},
{key:'bnoc',header:'bnoc'},
{key:'falt',header:'falt'},
{key:'lics',header:'lics'},
{key:'vaca',header:'vaca'},
{key:'desm',header:'desm'},
{key:'subm',header:'subm'},
{key:'sube',header:'sube'},
{key:'licp',header:'licp'},
{key:'psgo',header:'psgo'},
{key:'licf',header:'licf'},
{key:'pgoc',header:'pgoc'}];
// keep {} where you wan to skip the row
let data =this.json_data

data.forEach((item) => {
  sheet.addRow(item);
});
let fname=codempresa+"_"+anoproceso+"-"+mesproceso

workbook.xlsx.writeBuffer().then((data) => {
  let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
});




   this.closeModal();
 }
 DesaprobarTareo(aprobacion:Aprobaciones){
  var fecha:Date=new Date
  var date= this.datePipe.transform(fecha, "yyyy-MM-dd HH:mm:ss")||'';
   Swal.fire({
     title: '¿Éstas seguro de desaprobar? ',
     html:
   `Se desaprobara a la siguiente sede <b>${aprobacion.dessede}</b>, `+
   '',
     showDenyButton: true,
     showCancelButton: false,
     confirmButtonText: `Aceptar`,
     denyButtonText: `Cancelar`,
   }).then((result) => {
     /* Read more about isConfirmed, isDenied below */
     if (result.isConfirmed) {
       aprobacion.indaprueba='N'
       aprobacion.codusuarioaprueba =this.usuarioPanel||''
       aprobacion.fechaaprueba=date||''
       this.aprobacionservice.guardarAprobacion(aprobacion).subscribe(response=>
       Swal.fire('Desaprobado', '', 'success').then(result=>{
         if(result.isConfirmed){
           this.onListAprobaciones();
           this.changeDetectorRefs.detectChanges();
           this.closeModal();
         }
       })
       )
     }
   }
   )}






   onBuildFormAprobaciones() {
     this.formAprobacion = this.fb.group({
       id: ['', Validators.required],
       codempresa: ['', Validators.required],
       anoproceso: ['', Validators.required],
       mesproceso: ['', Validators.required],
       codsede: ['', Validators.required],
       dessede:['', Validators.required],
       indaprueba:[''],
       codusuarioaprueba:[''],
       fechaaprueba:['']
     });
   }

   onListAprobaciones(){
    var mesproceso=this.formFiltros.controls['mes'].value
    var anoproceso:string=this.formFiltros.controls['anio'].value
    var codempresa:string=this.formFiltros.controls['empresa'].value
    this.aprobacionservice.getAprobacionesFiltradas(codempresa,anoproceso,mesproceso).subscribe((response:any)=>{
      console.log(response)
      this.aprobacionesdata.data=response
      this.nroTotal= this.aprobacionesdata.data.length
      this.aprobacionesdata.paginator=this.paginator
    });

   }

   private closeModal(): void {
     this.modal.nativeElement.click();
     this.selectedTabIndex = 0;
   }

   get f() {
     return this.formAprobacion.controls;
   }






   AprobarTareo(aprobacion:Aprobaciones){
    var fecha:Date=new Date
    var date= this.datePipe.transform(fecha, "yyyy-MM-dd HH:mm:ss")||'';
    Swal.fire({
      title: '¿Éstas seguro de aprobar? ',
      html:
    `Se aprobará a la siguiente sede <b>${aprobacion.dessede}</b>, `+
    ' ',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        aprobacion.indaprueba='S'
        aprobacion.codusuarioaprueba =this.usuarioPanel||''
       aprobacion.fechaaprueba=date||''
        this.aprobacionservice.guardarAprobacion(aprobacion).subscribe(response=>
        Swal.fire('Aprobado', '', 'success').then(result=>{
          if(result.isConfirmed){
            this.onListAprobaciones();
            this.changeDetectorRefs.detectChanges();
            this.closeModal();
          }
        })
        )
      }
    }
    )

   }

   onListAnios(){
    this.anios=[]
    var codempresa:string=this.formFiltros.controls['empresa'].value
    this.aprobacionservice.getanios(codempresa).subscribe(response=>{
      this.anios=response
      console.log(this.anios)
    })
  }
  onListEmpresas(){


//metodo
// outputs: "48:39:30"
    this.empresas=[]
    this.empresaService.getEmpresabyUsu(this.usuarioPanel).subscribe(response=>{
      this.empresas=response
    })
  }
  Verificarregistros(aprobacion:Aprobaciones){
    var codsede= aprobacion.codsede
    var mes:string=this.formFiltros.controls['mes'].value
    var anio:string=this.formFiltros.controls['anio'].value
    var codempresa:string=this.formFiltros.controls['empresa'].value
    this.tareoservice.getRegistroAprobar(codempresa,anio,mes,codsede).subscribe(response=>{
      this.json_data=null
      this.json_data=response
      this.registrosdata.data=response
      this.nroTotalregistros= this.registrosdata.data.length
      this.registrosdata.paginator=this.paginatorRegistros
    })
  }

  toastAcceptedAlert(mensaje: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: mensaje
    })
  }

  toastRejectAlert(mensaje: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'warning',
      title: mensaje
    })
  }



}
