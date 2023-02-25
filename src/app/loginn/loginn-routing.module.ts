import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../auth-guard.guard';
import { Auth1Guard } from '../auth1.guard';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [Auth1Guard] },
  { path: 'login', component: LoginComponent, canActivate: [Auth1Guard] },
  { path: 'home',component: HomeComponent, canActivate: [AuthGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginnRoutingModule { }
