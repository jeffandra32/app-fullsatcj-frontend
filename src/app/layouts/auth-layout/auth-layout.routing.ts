import { LoginComponent } from './../../core/auth/login/login.component';
import { RegisterComponent } from './../../core/auth/register/register.component';
import { Routes } from '@angular/router';

export const AuthLayoutRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '/register',
    component: RegisterComponent,
  },
];
