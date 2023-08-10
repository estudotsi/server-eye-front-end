import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServerComponent } from './components/server/server.component';
import { OsComponent } from './components/os/os.component';
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

const routes: Routes = [

  { path: 'application', redirectTo: 'application/lista' },
  {
    path: 'application', component: ApplicationComponent,
    children: [
      { path: 'lista', component: ApplicationListaComponent },
    ],
  },

  { path: 'database', redirectTo: 'database/lista' },
  {
    path: 'database', component: DbComponent,
    children: [
      { path: 'lista', component: DbListaComponent },
    ],
  },

  { path: 'os', redirectTo: 'os/lista' },
  {
    path: 'os', component: OsComponent,
    children: [
      { path: 'lista', component: OsListaComponent },
      { path: 'novo', component: OsNovoComponent },
      { path: 'detalhe/:id', component: OsDetalhesComponent },
    ],
  },

  { path: 'server', redirectTo: 'server/lista' },
  {
    path: 'server', component: ServerComponent,
    children: [
      { path: 'lista', component: ServerListaComponent },
      { path: 'novo', component: ServerNovoComponent },
      { path: 'detalhe/:id', component: ServerDetalheComponent },
    ],
  },
  { path: 'server-por-rede', component: ServerPorRedeComponent },
  { path: 'redirect', component: RedirectComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
