import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/Clases/usuario';
import Swal from 'sweetalert2';
import { AuthService } from '../Servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private _usuario: Usuario;

  constructor(private authService: AuthService,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isAuthenticated()) {

        this._usuario = JSON.parse(sessionStorage.getItem('usuario')|| '{}') as Usuario;

        let _url: string = "";
        state.url.split("/").forEach(element => {
          if (_url === "")
            if (element !== "")
              _url = element;
        });
        return this.authService.isPermit(this._usuario.usuario, _url);
      }
      Swal.fire('Mensaje', `No tienes acceso`, 'error');
      this.router.navigate(['']);
      return false;
  }

}
