import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
   {path: 'login', component: LoginComponent},
   {path: 'dashboard', component: DashboardComponent},
   {path: 'home', component: HomeComponent},
   {path: '', redirectTo: 'home', pathMatch: 'full'},
   
];
