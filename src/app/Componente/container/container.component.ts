import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Menu } from 'src/app/Clases/menu';
import { Submenu } from 'src/app/Clases/submenu';
import { Usuario } from 'src/app/Clases/usuario';
import { AuthService } from 'src/app/Servicios/auth.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {


  title = 'frontend-admin-licencias';
  public auth: boolean = this.authService.isAuthenticated();
  public usuarioPanel: string|null;
  user:Usuario
  estado:string="Activos"
  valorSidebar:string
  imagenprincipal:String
  formdata:FormGroup

  public menus: Menu[];
  public submenus: Submenu[];
  public subsubmenu: Submenu[];
  private _usuario: Usuario;

  constructor(private authService: AuthService,
    private router: Router,

    private usuarioService: UsuarioService,

    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.loadAccessMenu();
      this.setUsuario();
      this.router.navigate(['/Principal']);

    }else{
      this.router.navigate(['']);
    }
  }


  loadUsuario() {
    if (JSON.parse(sessionStorage.getItem('usuario')||'{}')) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')||'{}') as Usuario;
    }
  }

  loadAccessMenu() {
    if (JSON.parse(sessionStorage.getItem('usuario')||'{}')) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')||'{}') as Usuario;
      if (this._usuario.usuario != null) {
        this.accessMenu(this._usuario);
      }
    }
  }

  getUsuario(usuario: Usuario) {
    this.usuarioPanel = null;
    if (usuario) {
      this.usuarioService.getUsuarioByUsuario(usuario.usuario).subscribe(
        (result) => {
          sessionStorage.setItem('nombre_usuario', JSON.stringify(result.nombre));
          sessionStorage.setItem('codusuario', JSON.stringify(result.usuario));
          this.usuarioPanel = result.nombre;
          window.location.reload();
        }, error => {
          console.log(error);
        }
      );
    }
  }

  setUsuario() {
    if (sessionStorage.getItem('nombre_usuario') != null) {
      this.usuarioPanel = JSON.parse(sessionStorage.getItem('nombre_usuario')||'{}');

    }
  }

  isPermit(url: string) {
    this.loadUsuario();
    this.authService.isPermit(this._usuario.usuario, url).subscribe(
      (result) => {
        console.log(this._usuario.usuario);
        if (!result) {
          Swal.fire('Aviso', 'No cuentas con acceso');
          this.router.navigate(['/principal']);
          return;
        }
        console.log(result);
      }, error => {
        console.log(error);
      }
    );
  }

  login() {
    this.auth = this.authService.isAuthenticated();
    this.changeDetectorRefs.detectChanges();
  }

  logout(): void {
    let username = this.authService.usuario.usuario;
    this.authService.logout();
    this.auth = this.authService.isAuthenticated();
    this.changeDetectorRefs.detectChanges();
    this.router.navigate([""]);
  }

  accessMenu(usuario: Usuario) {
    this.authService.accessMenu(usuario.usuario).subscribe(
      (result) => {
        this.menus = result;
        //console.log(result);
        this.menus.forEach(menu => {
          this.authService.accessSubMenuByUserAndGrupo(usuario.usuario, menu.codgrupomenu).subscribe(
            (result) => {
              //console.log(result);
              menu.maefuncion = result;
              sessionStorage.setItem('permisos', JSON.stringify(result));
              result.forEach(sub => {
                if (sub.desurl == null && sub.codfuncionsup == null) {
                  this.authService.accessSubMenu(usuario.usuario, sub.id).subscribe(
                    (result) => {
                      //console.log(result);
                      sub.submenu = result;
                      sub.submenu.forEach(subsub => {
                        if (subsub.desurl == null && subsub.codfuncionsup != null) {
                          this.authService.accessSubMenu(usuario.usuario, subsub.id).subscribe(
                            (result) => {
                              subsub.submenu = result;
                              //console.log(subsub.submenu);
                            }, error => {
                              console.log(error);
                            }
                          );
                        }
                      });
                    }, error => {
                      console.log(error);
                    }
                  );
                }
              });



            }, error => {
              console.log(error);
            }
          );



        });

      }, error => {
        console.log(error);
      }
    );
  }

  //configuracion de empresa e info solo para maestros

}
