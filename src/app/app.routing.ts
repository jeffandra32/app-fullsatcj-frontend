import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:
          './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'auth/login',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:
          './layouts/auth-layout/auth-layout.module#AuthLayoutModule',
      },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
