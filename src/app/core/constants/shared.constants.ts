import { HttpHeaders } from '@angular/common/http';

export class AppConstants {
  public static get _baseHttpOptions(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
