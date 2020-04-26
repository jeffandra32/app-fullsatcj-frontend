import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Location } from '@angular/common';
import { ROUTES } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userPictureOnly = false;
  user: any;
  public focus: any;
  public listTitles: any[];
  public location: Location;

  /**
   * @param {Location} location
   * @param {AuthenticationService} authenticationService
   * @param {Router} router
   * @memberof NavbarComponent
   */
  constructor(
    location: Location,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.getUser();
  }

  /**
   * Recuperar informação para o usuário logado.
   * @private
   * @memberof NavbarComponent
   */
  private getUser() {
    const userInfor = JSON.parse(localStorage.getItem('currentUser'));
    this.user = userInfor.firstName;
  }

  /**
   * Informar o titulo da página.
   * @returns
   * @memberof NavbarComponent
   */
  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(8);
    }

    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'admin';
  }

  /**
   * Desloga do sistema e remove as credenciais.
   * @memberof NavbarComponent
   */
  logOut(): void {
    this.user = null;
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
