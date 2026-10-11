import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { Signup } from './signup/signup';
import { Home } from './home/home';
import { AdminComponent } from './admin-component/admin-component';

export const routes: Routes = [
    {path:'login', component:Login},
    {path:'', redirectTo: 'login', pathMatch: 'full'},
    {path:'dashboard', component:Dashboard},
    {path:'signup', component:Signup},
    {path:'home', component:Home},
    {path: 'admin', component: AdminComponent}
];
