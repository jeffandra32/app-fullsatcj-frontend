import { Routes } from '@angular/router';

export const AdminLayoutRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () => import('./../../pages/home/home.module').then(h => h.HomeModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./../../pages/profile/profile.module').then(p => p.ProfileModule),
  },
];
