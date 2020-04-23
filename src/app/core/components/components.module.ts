import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
  ],

  declarations: [NavbarComponent, SidebarComponent, FooterComponent],
  exports: [NavbarComponent, SidebarComponent, FooterComponent],
})
export class ComponentsModule {}
