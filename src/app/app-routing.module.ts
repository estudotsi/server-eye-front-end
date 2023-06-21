import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServerComponent } from './components/server/server.component';
import { OsComponent } from './components/os/os.component';
import { OsListaComponent } from './components/os/os-lista/os-lista.component';

const routes: Routes = [

  { path: 'os', redirectTo: 'os/lista' },
  {
    path: 'os', component: OsComponent,
    children: [
      { path: 'lista', component: OsListaComponent },
    ],
  },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'servers', component: ServerComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
