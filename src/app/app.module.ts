import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { ServerComponent } from './components/server/server.component';
import { OsComponent } from './components/os/os.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OsListaComponent } from './components/os/os-lista/os-lista.component';
import { ServerListaComponent } from './components/server/server-lista/server-lista.component';
import { ApplicationComponent } from './components/application/application.component';
import { ApplicationListaComponent } from './components/application/application-lista/applicaton-lista.component';
import { ServerPorRedeComponent } from './components/server/server-por-rede/server-por-rede.component';
import { RedirectComponent } from './components/server/redirect/redirect.component';
import { DbComponent } from './components/db/db.component';
import { DbListaComponent } from './components/db/db-lista/db-lista.component';
import { OsNovoComponent } from './components/os/os-novo/os-novo.component';
import { OsDetalhesComponent } from './components/os/os-detalhes/os-detalhes.component';
import { ServerNovoComponent } from './components/server/server-novo/server-novo.component';
import { ServerDetalheComponent } from './components/server/server-detalhe/server-detalhe.component';
import { DbNovoComponent } from './components/db/db-novo/db-novo.component';
import { DbDetalheComponent } from './components/db/db-detalhe/db-detalhe.component';
import { ApplicationNovoComponent } from './components/application/application-novo/application-novo.component';
import { ApplicationDetalheComponent } from './components/application/application-detalhe/application-detalhe.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TituloComponent,
    ServerComponent,
    OsComponent,
    DashboardComponent,
    OsListaComponent,
    ServerListaComponent,
    ApplicationComponent,
    ApplicationListaComponent,
    ServerPorRedeComponent,
    RedirectComponent,
    DbComponent,
    DbListaComponent,
    OsNovoComponent,
    OsDetalhesComponent,
    ServerNovoComponent,
    ServerDetalheComponent,
    DbNovoComponent,
    DbDetalheComponent,
    ApplicationNovoComponent,
    ApplicationDetalheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
