import { ForgotPasswordComponent } from './../../core/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './../../core/auth/login/login.component';
import { RegisterComponent } from './../../core/auth/register/register.component';
import { ResetPasswordComponent } from './../../core/auth/reset-password/reset-password.component';
import { Routes } from '@angular/router';

export const AuthLayoutRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
  },
];
