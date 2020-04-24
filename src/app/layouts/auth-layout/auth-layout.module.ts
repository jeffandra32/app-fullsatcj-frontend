import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthLayoutRoutes } from './auth-layout.routing';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../core/components/components.module';
import { ForgotPasswordComponent } from './../../core/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './../../core/auth/login/login.component';
import { RegisterComponent } from './../../core/auth/register/register.component';
import { ResetPasswordComponent } from './../../core/auth/reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ],
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, ForgotPasswordComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthLayoutModule {}
