import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthLayoutRoutes } from './auth-layout.routing';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../core/components/components.module';
import { LoginComponent } from './../../core/auth/login/login.component';
import { RegisterComponent } from './../../core/auth/register/register.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    // NgbModule
  ],
  declarations: [LoginComponent, RegisterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthLayoutModule {}
