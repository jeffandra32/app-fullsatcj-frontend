import { Routes } from '@angular/router';

export const AdminLayoutRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () => import('./../../pages/home/home.module').then(p => p.HomeModule),
  },
];
