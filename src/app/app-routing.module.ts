import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AprobacionesComponent } from './Componente/aprobaciones/aprobaciones.component';
import { ContainerComponent } from './Componente/container/container.component';
import { LoginComponent } from './Componente/login/login.component';
import { LotesComponent } from './Componente/lotes/lotes.component';
import { TareoComponent } from './Componente/tareo/tareo.component';
import { UsuarioComponent } from './Componente/usuario/usuario.component';


const routes: Routes = [ { path: '',
component: LoginComponent,
pathMatch: 'full'
},
{
path: 'Principal',
component: ContainerComponent,
children: [
  {
    path: 'Tareo',
    component: TareoComponent
  },
  {
    path: 'Aprobaciones',
    component: AprobacionesComponent
  },
  {
    path: 'Usuarios',
    component: UsuarioComponent
  },
  {
    path: 'Lotes',
    component: LotesComponent
  },
]},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
