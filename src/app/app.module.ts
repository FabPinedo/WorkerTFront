import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioButton, MatRadioModule} from '@angular/material/radio';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './Componente/login/login.component';
import { ContainerComponent } from './Componente/container/container.component';
import { TareoComponent } from './Componente/tareo/tareo.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AprobacionesComponent } from './Componente/aprobaciones/aprobaciones.component';
import { UsuarioComponent } from './Componente/usuario/usuario.component';
import { LotesComponent } from './Componente/lotes/lotes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContainerComponent,
    TareoComponent,
    AprobacionesComponent,
    UsuarioComponent,
    LotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatCheckboxModule,
    MatTabsModule
  ],
  providers: [DatePipe
  ,{provide: LocationStrategy, useClass: HashLocationStrategy},
  {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},],
  bootstrap: [AppComponent ]
})
export class AppModule { }
