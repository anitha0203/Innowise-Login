import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./loginn/loginn.module').then(m => m.LoginnModule),
  //   canActivate: [AuthGuardGuard]  
  // }
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.component').then(m => m.HomeComponent),
  //   canActivate: [AuthGuardGuard]    
  // }
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
