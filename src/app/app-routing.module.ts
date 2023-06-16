import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServerComponent } from './components/server/server.component';
import { OsComponent } from './components/os/os.component';

const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'servers', component: ServerComponent },
  { path: 'os', component: OsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
