import { SelectionModel } from '@angular/cdk/collections';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Anios } from 'src/app/Clases/anios';
import { Conceptopermisos } from 'src/app/Clases/conceptopermisos';
import { Empresas } from 'src/app/Clases/empresas';
import { Lote } from 'src/app/Clases/lote';
import { Mesproc } from 'src/app/Clases/mesproc';
import { Plapersonal } from 'src/app/Clases/plapersonal';
import { Registrotareo } from 'src/app/Clases/registrotareo';
import { Registrotareorefri } from 'src/app/Clases/registrotareorefri';
import { Submenu } from 'src/app/Clases/submenu';
import { Tabladet } from 'src/app/Clases/tabladet';
import { ConceptopermisoService } from 'src/app/Servicios/conceptopermiso.service';
import { EmpresaService } from 'src/app/Servicios/empresa.service';
import { LoteService } from 'src/app/Servicios/lote.service';
import { MesprocService } from 'src/app/Servicios/mesproc.service';
import { PlapersonalService } from 'src/app/Servicios/plapersonal.service';
import { RegistrotareoService } from 'src/app/Servicios/registrotareo.service';
import { RegistrotareorefriService } from 'src/app/Servicios/registrotareorefri.service';
import { TabladetService } from 'src/app/Servicios/tabladet.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareo',
  templateUrl: './tareo.component.html',
  styleUrls: ['./tareo.component.css']
})
export class TareoComponent implements OnInit {
  formRegistros: FormGroup;
  formRefri:FormGroup;
  nroTotal:number
  anios:Anios[]=[]
  permisosseg:Submenu[]=[]
  isDisable=false
  registrosTareo:Registrotareo[];
  isEditable:boolean=false
  usuarioPanel:string;
  bloqueo:boolean=true;
  listaUpload:Registrotareo[]=[]
  lotes:Lote[]=[]
  period:Mesproc=new Mesproc
  listaUploadrefri:Registrotareorefri[]=[]
  registroasistenciaActual:Registrotareo=new Registrotareo
  listadoRefris:FormGroup[]=[]
  public selectedTabIndex: number = 0;
  displayedColumns = ['Sel', 'Fecha', 'Dia','Turno','FecIni','HorIni','FecFin','HorFin'
,'Tiemref','Hefe','He25','He35','H100','Hen25','Hen35','Hn100','Bnoc','Lote','Concepto']

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild('closebutton') modal: ElementRef;
  registrosdata = new MatTableDataSource<any>();

  selection = new SelectionModel<any>(true, []);
  contador:number=0

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {

    const numSelected = this.selection.selected.length;
    const numRows = this.registrosdata.data.length;
    const numRowsMinusExcluded = this.registrosdata.data
      .filter(row => !row.value.cerrado)
      .length;
    return numSelected === numRowsMinusExcluded;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.bloqueo=true
      this.selection.clear();
      return;
    }else{
      this.bloqueo=false
    }

    this.registrosdata.data.forEach(row => {
      if (!row.value.cerrado) {
        this.selection.select(row);
      }

    });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  refrigerioscol: string[] = ['sel', 'fecini','horini','fecfin', 'horfin'];
  refrigeriosdata = new MatTableDataSource<any>();

  selectionrefri = new SelectionModel<any>(true, []);
  @ViewChild(MatTable) table: MatTable<any>;
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected2() {
    const numSelected = this.selectionrefri.selected.length;
    const numRows = this.refrigeriosdata.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle2() {
    if (this.isAllSelected2()) {
      //
      this.selectionrefri.clear();
      return;
    }else{
      //
    }

    this.selectionrefri.select(...this.refrigeriosdata.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel2(row?: any): string {
    if (!row) {
      return `${this.isAllSelected2() ? 'deselect' : 'select'} all`;
    }
    return `${this.selectionrefri.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  private closeModal(): void {
    this.modal.nativeElement.click();
  }
  crearrefri(id:number):FormGroup{
    const fg = new FormGroup({
      idrefri:new FormControl(''),
      idasistencia:new FormControl(id, Validators.required),
      entrada:new FormControl(''),
      fechaentrada:new FormControl(''),
      horaentrada:new FormControl(''),
      salida:new FormControl(''),
      fechasalida:new FormControl(''),
      horasalida:new FormControl(''),
      codusuariocrea:new FormControl(''),
      fechacrea:new FormControl(''),
      codusuariomodif:new FormControl(''),
      fechamodif:new FormControl(''),
      isAddDaysEnabled:new FormControl(true)
    });
    return fg;
  }
  OnlistRegistrosrefri() {

    this.refrigeriosService.getRegistroRefritotalbyid(this.registroasistenciaActual.idasistencia,this.registroasistenciaActual.fechamar).subscribe(respuesta=>{
        const fgss = respuesta.map(Registrotareorefri.asFormGroup);
        var listados:FormArray= new FormArray(fgss)
        this.formRefri.setControl('refrigerios', listados);
        this.refrigeriosdata.data=listados.controls
        this.table.renderRows();
      })




  }
  addData() {

    var date:string|null
    var fecha:Date=new Date
    date= this.datePipe.transform(fecha, "yyyy-MM-dd HH:mm:ss");
    var nuevo:Registrotareorefri=new Registrotareorefri;
    nuevo.idasistencia=this.registroasistenciaActual.idasistencia
    nuevo.codusuariocrea=this.usuarioPanel
    nuevo.fechacrea=date||''
    nuevo.fechaentrada=this.datePipe.transform(this.registroasistenciaActual.fechamar, "dd/MM/yyyy")||'';
    nuevo.fechasalida=this.datePipe.transform(this.registroasistenciaActual.fechamar, "dd/MM/yyyy")||'';
    this.refrigeriosService.postregistro(nuevo).subscribe(response=>{
      this.OnlistRegistrosrefri();
    })
  }

  removeData() {
    for (let data of this.refrigeriosdata.data) {
      for(let sele of this.selectionrefri.selected)
        if(data.value.idrefri==sele.value.idrefri){
          this.refrigeriosService.eliminarregistro(data.value.idrefri).subscribe(response=>{
            console.log("elimino "+data.value.idrefri)
            this.OnlistRegistrosrefri();
          })
        }
      }

      this.selectionrefri = new SelectionModel<Element>(true, []);


  }


  onChange(ob: MatCheckboxChange) {
    if(ob.checked){
      this.contador=this.contador+1;
    this.bloqueo=false
    }else{
      this.contador=this.contador-1;
    }

    if(this.contador==0){
      this.bloqueo=true
    }
    console.log("PQR checked: " + ob.checked);
  }


  getTareoRefri(element:any){
    this.selectionrefri = new SelectionModel<Element>(true, []);
    this.registroasistenciaActual=element.value
    this.OnlistRegistrosrefri();
  }
  selectpermiso(){
    console.log(this.permisos.indexOf(this.formFiltros.controls['permisos'].value))
  }
  cambiardata(){


  }

  onBuildForm(){
      this.formRegistros = this.formBuilder.group({
      registros: this.formBuilder.array([])
    });
  }
  onBuildFormrefri(){
    this.formRefri = this.formBuilder.group({
    refrigerios: this.formBuilder.array([])
  });
}
  guardarPermiso(){
    var date:string
    var fecha:Date=new Date
    this.listaUploadrefri=[]
    date= this.datePipe.transform(fecha, "yyyy-MM-dd HH:mm:ss")||'';
    if(this.formFiltros.controls['permisos'].value!=''){
      for (let data of this.registrosdata.data) {
        for(let sele of this.selection.selected)
          if(data.value.idasistencia==sele.value.idasistencia){
            data.value.conperid=null
            data.value.conperid=this.formFiltros.controls['permisos'].value
            data.value.fechaentrada=null
            data.value.fechasalida=null
            data.value.horaentrada=null
            data.value.horasalida=null
            data.value.entrada=null
            data.value.salida=null
            data.value.horcla=null
            data.value.lote=null
            data.value.codusuariomodif=null
            data.value.codusuariomodif=this.usuarioPanel
            data.value.fechamodif=null
            data.value.fechamodif=date
            this.listaUpload.push(data.value)
          }
      }
      console.log(this.listaUpload)
      this.registrotareoService.postregistroListado(this.listaUpload).subscribe(respuesta=>{
        this.selection = new SelectionModel<Element>(true, []);
        //Swal.fire('Registros exitosos',`registros actualizados creado con exito `, 'success')
        this.toastAcceptedAlert("Registros exitosos");
        this.OnlistRegistros();
        this.bloqueo=true
      })
    }else{
      this.toastRejectAlert("Selecciones una ópcion de permiso")
    }



  }
  limpiardata(){
    this.registrosdata.data=[]
    this.nroTotal=0
    }
  eliminarPermiso(){
    this.listaUpload=[]
    for (let data of this.registrosdata.data) {
      for(let sele of this.selection.selected)
        if(data.value.idasistencia==sele.value.idasistencia){
          data.value.conperid=null
          this.listaUpload.push(data.value)
        }
    }
    this.registrotareoService.postregistroListado(this.listaUpload).subscribe(respuesta=>{
      this.selection = new SelectionModel<Element>(true, []);
      //Swal.fire('Registros exitosos',`registros actualizados creado con exito `, 'success')
      this.toastAcceptedAlert("Registros exitosos");
      this.OnlistRegistros();
      this.bloqueo=true
    })
  }


  OnlistRegistros() {

    var codpersonal:string=this.formFiltros.controls['trabajador'].value
    var codempresa:string=this.formFiltros.controls['empresa'].value
    var sede:string=this.formFiltros.controls['sede'].value
    var anio:string=this.formFiltros.controls['anio'].value
    var mes:string=this.formFiltros.controls['periodo'].value

    var lote:string=this.formFiltros.controls['lote'].value
    console.log(sede+"  prueba aqui ")
    this.registrotareoService.crearfechaprocesoNuevosRegistros(codpersonal,codempresa,this.usuarioPanel,anio,mes,lote,sede).subscribe(respuesta=>{
        const fgss = respuesta.map(Registrotareo.asFormGroup);
        var listados:FormArray= new FormArray(fgss)
        this.formRegistros.setControl('registros', listados);

        this.registrosdata.data=listados.controls
        this.nroTotal= this.registrosdata.data.length
        this.registrosdata.paginator=this.paginator
        console.log(listados.controls)
      })


  }
  onSubmitregrigerios(){
    var date:string
    var fecha:Date=new Date
    this.listaUploadrefri=[]
    date= this.datePipe.transform(fecha, "yyyy-MM-dd HH:mm:ss")||'';
    for (let data of this.refrigeriosdata.data) {

      var fecini = new DatePipe('en-US').transform(data.value.fechaentrada, 'dd/MM/yyyy')
      var fecfin = new DatePipe('en-US').transform(data.value.fechasalida, 'dd/MM/yyyy')
      var horaentrada = data.value.horaentrada+":00"
      var horasalida = data.value.horasalida+":00"
      console.log(fecini,fecfin,horaentrada,horasalida)

      if(fecini!=null && fecfin!=null && horaentrada!=null && horasalida!=null){

        data.value.entrada=data.value.fechaentrada+" "+horaentrada
        data.value.salida=data.value.fechasalida+" "+horasalida
        data.value.codusuariomodif=null
        data.value.codusuariomodif=this.usuarioPanel
        data.value.fechamodif=null
        data.value.fechamodif=date
        data.value.fechaentrada=fecini
        data.value.fechasalida=fecfin
        data.value.horaentrada=horaentrada
        data.value.horasalida=horasalida
        this.listaUploadrefri.push(data.value)
      }else{
        console.log("aqui llega")
      }

    }
    if(this.listaUploadrefri.length>0){
      console.log(this.listaUploadrefri)
      this.refrigeriosService.postregistroListado(this.listaUploadrefri).subscribe(response=>{
            this.selectionrefri = new SelectionModel<Element>(true, []);
            this.toastAcceptedAlert("Registro exitoso")
            this.closeModal()
            var minutes:number=0
            for(let refri of this.listaUploadrefri){
              console.log(refri)
              var ms = moment(refri.salida,"yyyy-MM-dd HH:mm:ss").diff(moment(refri.entrada,"yyyy-MM-dd HH:mm:ss"));
              var d = moment.duration(ms);
              var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
              var ds2=moment.duration(s).asMinutes()
              minutes=minutes+ds2
            }
            console.log(minutes)
            for(let registroweb of this.registrosdata.data){
              if(registroweb.value.idasistencia==this.registroasistenciaActual.idasistencia){
                registroweb.value.tiemref=moment.utc().startOf('day').add(minutes, 'minutes').format('HH:mm')
              }

            }
            console.log(this.registrosdata.data)


            })

    }

  }

  GuardarRegistros(){
    var date:string
    var fecha:Date=new Date
    this.listaUpload=[]
    date= this.datePipe.transform(fecha, "yyyy-MM-dd HH:mm:ss")||'';
    for (let data of this.registrosdata.data) {
      var fecini = new DatePipe('en-US').transform(data.value.fechaentrada, 'dd/MM/yyyy')
      var fecfin = new DatePipe('en-US').transform(data.value.fechasalida, 'dd/MM/yyyy')
      var horaentrada = data.value.horaentrada+":00"
      var horasalida = data.value.horasalida+":00"
      var horcla = data.value.horcla
      console.log(fecini,fecfin,horaentrada,horasalida)

      if(data.value.conperid!=null){
        data.value.fechaentrada=null
        data.value.fechasalida=null
        data.value.horaentrada=null
        data.value.horasalida=null
        data.value.entrada=null
        data.value.salida=null
        data.value.horcla=null
        data.value.lote=null
        data.value.codusuariomodif=null
        data.value.codusuariomodif=this.usuarioPanel
        data.value.fechamodif=null
        data.value.fechamodif=date
        this.listaUpload.push(data.value)
      }else{
         if(horcla!=null){
           if(fecini!=null && fecfin!=null && horaentrada!=null && horasalida!=null){
              data.value.entrada=data.value.fechaentrada+" "+horaentrada
              data.value.salida=data.value.fechasalida+" "+horasalida
              data.value.codusuariomodif=null
              data.value.codusuariomodif=this.usuarioPanel
              data.value.fechamodif=null
              data.value.fechamodif=date
              data.value.fechaentrada=fecini
              data.value.fechasalida=fecfin
              data.value.horaentrada=horaentrada
              data.value.horasalida=horasalida
           }
           this.listaUpload.push(data.value)

        }else{
        console.log("aqui llega")
        }
      }



    }
      if(this.listaUpload.length>0){
        console.log(this.listaUpload)
        this.registrotareoService.postregistroListado(this.listaUpload).subscribe(response=>{
          this.selection = new SelectionModel<Element>(true, []);
          //Swal.fire('Registros exitosos',`registros actualizados creado con exito `, 'success')
          this.toastAcceptedAlert("Registros exitosos");
          this.OnlistRegistros();
          })

      }

  }

  buscarregistros(){
    console.log("aea")
    console.log(this.formFiltros.value)
    this.OnlistRegistros();
  }

  get Registros(): FormArray {
    return this.formRegistros.get('registros') as FormArray;
  }


  date:Date
public empresaActual:Empresas
  public empresas:Empresas[]
  public sedes:Tabladet[]
  public zonas:Tabladet[]
  public periodos:Mesproc[]
  public permisos:Conceptopermisos[]
  public trabajadores:Plapersonal[]

  public formFiltros: FormGroup;

  public submitted = false;



  constructor(private formBuilder: FormBuilder,
    private datePipe:DatePipe,
    private empresaService: EmpresaService,
    private tabladetService:TabladetService,
    private mesprocService:MesprocService,
    private loteservice:LoteService,
    private refrigeriosService:RegistrotareorefriService,
    private permisosService:ConceptopermisoService,
    private registrotareoService:RegistrotareoService,
    private plapersonalService:PlapersonalService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  onBuildFormFiltros() {
    this.formFiltros = this.formBuilder.group({
      empresa: ['', Validators.required],
      zona: ['', Validators.required],
      sede: ['',Validators.required],
      periodo: ['', Validators.required],
      trabajador: ['', Validators.required],
      permisos: [''],
      anio:['', Validators.required],
      lote:['']


    });
  }




  get f() {
    return this.formFiltros.controls;
  }



  onListZonas(){
    this.zonas=[]
    this.tabladetService.getzonas().subscribe(response=>{
      this.zonas=response
    })
  }
  onListAnios(){
    this.anios=[]
    var empresa:string=this.formFiltros.controls['empresa'].value
    this.mesprocService.getanios(empresa).subscribe(response=>{
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
  onListSedes(){
    this.sedes=[]
    this.tabladetService.getsedes().subscribe(response=>{
      this.sedes=response
    })


  }
  getlotes(){
    this.lotes=[]
    this.loteservice.getlotes().subscribe(response=>{
      this.lotes=response
    })
  }

  getperiodos(){
    this.periodos=[]
    var empresa:string=this.formFiltros.controls['empresa'].value
    var anio:string= this.formFiltros.controls['anio'].value

    if(empresa!='' && anio!=''){
      this.mesprocService.getMesProc(this.formFiltros.controls['empresa'].value,this.formFiltros.controls['anio'].value).subscribe(response=>{
            this.periodos=response
            console.log(response)
          })
    }


  }
  getTrabajadores(){
    console.log(this.usuarioPanel)
    this.trabajadores=[]
    var empresa:string=this.formFiltros.controls['empresa'].value
    var zona:string= this.formFiltros.controls['zona'].value
    var sede:string= this.formFiltros.controls['sede'].value
    if(empresa!='' && zona!='' && sede!=''){
      console.log(empresa,zona,sede)
      this.plapersonalService.getplapersonal(this.formFiltros.controls['empresa'].value,this.formFiltros.controls['sede'].value,this.formFiltros.controls['zona'].value).subscribe(response=>{
            this.trabajadores=response
            console.log(response)
            this.changeDetectorRefs.detectChanges();
          })
    }


  }
  getpermisos(){
    this.permisos=[]
    this.permisosService.getPermisos().subscribe(response=>{
      this.permisos=response
      this.changeDetectorRefs.detectChanges();
    })
  }
  onSubmit(){

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

  ngOnInit(): void {
    //this.appts.isPermit("tabla");
    this.obtenerData();
    this.verificarCredenciales();
    this.onBuildFormFiltros();
    this.onListEmpresas();
    this.onListSedes();
    this.onListZonas();
    this.getpermisos();
    this.onBuildForm();
    this.onBuildFormrefri();
    this.getlotes();

  }
  obtenerData(){
    var usuario = JSON.parse(sessionStorage.getItem('usuario')||'{}');
    this.usuarioPanel=usuario.usuario
  this.permisosseg=JSON.parse(sessionStorage.getItem('permisos')||'{}');

   }
  verificarCredenciales(){
    for(let permiso of this.permisosseg){
      if(permiso.desfuncion=="Tareo"){
        if(permiso.escperm==0){
          this.isDisable=true
        }
      }
    }
   }


}
