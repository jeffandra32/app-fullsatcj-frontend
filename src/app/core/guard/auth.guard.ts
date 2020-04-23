import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   * Creates an instance of AuthGuard.
   * @param {Router} router
   * @param {AuthenticationService} authenticationService
   * @memberof AuthGuard
   */
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
