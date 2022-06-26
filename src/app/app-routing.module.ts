import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'user',
  loadChildren: () => import('./modules/user/user-routing.module').then((b) => b.UserRoutingModule)
},
{
  path: '',
  loadChildren: () => import('./modules/dashboard/dashboard-routing.module').then((b) => b.DashboardRoutingModule)
},
{
  path: 'login',
  redirectTo: 'user/login'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
