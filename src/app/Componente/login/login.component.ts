import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Usuario } from 'src/app/Clases/usuario';
import { AuthService } from 'src/app/Servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public formUsuario: FormGroup;
  public usuario = new Usuario();

  codusuario:String
  contra:string
  NuevoUsuario:Usuario

  constructor(
    private formBuilder:FormBuilder,
    private authService: AuthService,
    private router: Router,
    private appts: AppComponent) { }

  ngOnInit(): void {
    this.onbuildFormUsuario();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/Principal']);
    }
  }
  onbuildFormUsuario(){
    this.formUsuario = this.formBuilder.group({
      usuario: ['', Validators.required],
      password:['', Validators.required]
    });
  }

  login() {
    console.log(this.formUsuario.value)
    this.authService.login(this.formUsuario.value).subscribe(
      (response) => {

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario;
        this.appts.login();

        this.appts.accessMenu(usuario);
        this.appts.getUsuario(usuario);
        this.router.navigate(['/Principal']);
        //window.location.reload();
        //Swal.fire('Login', `Hola ${usuario.usuario}, has iniciado sesión con éxito!`, 'success');
      }, error => {
        Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
        
      }
    );

  }


}
