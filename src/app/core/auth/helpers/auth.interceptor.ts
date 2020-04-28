import { Injectable, Injector } from '@angular/core';

import { AuthenticationService } from './../../services/auth.service';
import {
  HttpInterceptor,
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: { clone: (arg0: { setHeaders: { Authorization: string } }) => any },
    next: { handle: (arg0: any) => any }
  ) {
    const authService = this.injector.get(AuthenticationService);
    const tokenrizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return next.handle(tokenrizedReq);
  }
}
