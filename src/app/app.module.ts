import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './core/components/components.module';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './pages/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { environment } from './../environments/environment.prod';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    CommonModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(environment.toastConfig),
    HomeModule,
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
