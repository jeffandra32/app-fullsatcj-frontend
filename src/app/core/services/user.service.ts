import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import { AppConstants } from '../constants/shared.constants';
import { HandleError } from './../util/handle-error';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileDTO } from '../interfaces/user-profile';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseHttpHeader: HttpHeaders;
  baseURL: string;
  pathEndpointUserById: string;
  private readonly _pathEndpoint = '/users/';

  /**
   * Creates an instance of ProcessService.
   * @param {HttpClient} http
   * @memberof ProcessService
   */
  constructor(private http: HttpClient) {
    this.pathEndpointUserById = `${environment.hosts.local}${this._pathEndpoint}`;
    this.baseHttpHeader = AppConstants._baseHttpOptions;
  }

 
  /**
   * Retorna informações do usuário pelo {id}
   * @param {string} userId
   * @returns {Observable<any>}
   * @memberof UserService
   */
  getUserById(userId: string): Observable<UserProfileDTO> {
    const getParams = new HttpParams().set('id', userId);
    return this.http
      .get<UserProfileDTO>(this.pathEndpointUserById, {
        headers: this.baseHttpHeader,
        params: getParams,
      })
      .pipe(retry(1), catchError(HandleError.handleError));
  }

}
