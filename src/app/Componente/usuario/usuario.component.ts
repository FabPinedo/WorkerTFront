import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Submenu } from 'src/app/Clases/submenu';
import { Usuario } from 'src/app/Clases/usuario';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  permisos:Submenu[]=[]
  tmpempresa:number
  isDisable=false
  usuariocol: string[] = ['Opciones','codusuario','nombre'];
  usuariodata = new MatTableDataSource<any>();

  @ViewChild('closebutton') modal: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  usuarioPanel:string|null;
  options: FormGroup;

  public tmpuser: string;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  fontSizeControl = new FormControl(12, Validators.min(10));
  activado:boolean=false
  public formUser: FormGroup;
  public selectedTabIndex: number = 0;
  public submitted = false;
  nuevo:boolean;
  info:string="Nuevo Usuario "
  nroTotal:number
  paginador:any
  opcion:string
  buscador:string
  ruc:string
  razon:string
  tipo:string
  user:Usuario
  usuarios:Usuario[]=[]
  constructor(

    private userservice:UsuarioService,
    private changeDetectorRefs: ChangeDetectorRef,
    private fb: FormBuilder){

      this.options = fb.group({
        hideRequired: this.hideRequiredControl,
        floatLabel: this.floatLabelControl,
        fontSize: this.fontSizeControl,
        infoBuscar:['', Validators.required],
        criterioBusqueda:['', Validators.required]
      });


    }
    onBuildFormUser() {
      this.formUser = this.fb.group({
        codempresa:[''],
        usuario: ['',Validators.required],
        nombre: ['', Validators.required],
        password: ['', Validators.required],
        perfil: ['', Validators.required],
        estado: ['', Validators.required],

      });
    }
  ngOnInit(): void {
    this.obtenerData();
    this.onBuildFormUser();
    this.onListUsuarios();
    this.verificarCredenciales();
  }
  obtenerData(){
    var usuario = JSON.parse(sessionStorage.getItem('usuario')||'{}');
    this.usuarioPanel=usuario.usuario
  this.permisos=JSON.parse(sessionStorage.getItem('permisos')||'{}');

   }
  verificarCredenciales(){
    for(let permiso of this.permisos){
      if(permiso.desfuncion=="Usuarios"){
        if(permiso.escperm==0){
          this.isDisable=true
        }
      }
    }
   }
  onResetFormPerfil() {
    this.nuevo=true
    this.selectedTabIndex = 0;
    this.submitted = false;
    this.formUser.reset();
  }
  onListUsuarios(){
    this.userservice.getUsuariosCambio().subscribe((response:any)=>{
      this.usuariodata.data=response
      this.nroTotal= this.usuariodata.data.length
      this.usuariodata.paginator=this.paginator
    });
  }


  private closeModal(): void {
    this.modal.nativeElement.click();
    this.selectedTabIndex = 0;
  }
  get f() {
    return this.formUser.controls;
  }

  onUpdateUser(user:Usuario) {


    this.formUser.patchValue({

        usuario:user.usuario,
        nombre:user.nombre,
        password:'',
        codpersonal:user.codpersonal,
        estado:user.estado,
        fecbaja:user.fecbaja,
        indadmin:user.indadmin,
        codempresa:user.codempresa,
        numverareas:user.numverareas,
        codareas:user.codareas,
        usuariomail:user.usuariomail,
        indtareoadm:user.indtareoadm,
        indpd:user.indpd,
        chgpss:user.chgpss,
        autweb:user.autweb,
        admlevel:user.admlevel,
        changepass:user.changepass,
        indkiosko:user.indkiosko
    });


  }
  onSubmit(){

      this.userservice.crearUsuario(this.formUser.value).subscribe(
        response=>{
        Swal.fire('Usuario actualizado',`Usuario : ${this.formUser.controls['nombre'].value} ha sido actualizado`, 'success')
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.onResetFormPerfil();
            this.onListUsuarios();
            this.changeDetectorRefs.detectChanges();
            this.closeModal();

      }
    })
        })

  }
  Buscar(){

    console.log(this.options.controls['criterioBusqueda'].value);
      console.log(this.options.controls['infoBuscar'].value)
      if(this.options.controls['criterioBusqueda'].value=="codusuario"){
        this.userservice.getUsuarioBycod(this.options.controls['infoBuscar'].value).subscribe(response=>{
          this.usuariodata.data=response
          this.nroTotal= this.usuariodata.data.length
       });
      }else if(this.options.controls['criterioBusqueda'].value=="nombre"){
        this.userservice.getUsuarioByName(this.options.controls['infoBuscar'].value).subscribe(response=>{
          this.usuariodata.data=response
          this.nroTotal= this.usuariodata.data.length
       });
      }else{
        Swal.fire('Por favor escoger una de las opciones de búsqueda', 'Escoger entre búsqueda por ruc o razón social', 'error')

      }

  }

}
