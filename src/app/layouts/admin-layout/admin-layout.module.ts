import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../core/components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    ComponentsModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminLayoutModule {}
