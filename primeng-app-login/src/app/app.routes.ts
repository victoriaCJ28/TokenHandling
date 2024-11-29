import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';


export const routes: Routes = [
   {path: 'login', component: LoginComponent},
   {path: 'dashboard', component: DashboardComponent},
   {path: 'layout', component: LayoutComponent},
   {path: '', redirectTo: 'login', pathMatch: 'full'},
   
];
