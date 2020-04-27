import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../../core/guard/auth.guard';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [ { path: '', component: HomeComponent, canActivate: [AuthGuard] },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
