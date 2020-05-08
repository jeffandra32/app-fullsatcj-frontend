import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';

import { CredenciaisDTO } from './../interfaces/credenciais';
import { HandleError } from './../util/handle-error';
import { Injectable } from '@angular/core';
import { NewUserDTO } from './../interfaces/new-user';
import { ResetPasswordDTO } from './../interfaces/reset-password';
import { UserDTO } from './../interfaces/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseHttpHeader: HttpHeaders;
  cachedRequests: Array<HttpRequest<any>> = [];
  private baseURL: any;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private pathEndpointLogin: string;
  private pathEndpointRegister: string;
  private pathEndpointForgot: string;
  private pathEndpointReset: string;
  private readonly _pathEndpointLogin = '/login';
  private readonly _pathEndpointRegister = '/register';
  private readonly _pathEndpointForgot = '/forgot';
  private readonly _pathEndpointReset = '/reset';


  /**
   * Creates an instance of AuthenticationService.
   * @param {HttpClient} http
   * @memberof AuthenticationService
   */
  constructor(private http: HttpClient) {
    this.pathEndpointLogin = `${environment.hosts.local}${this._pathEndpointLogin}`;
    this.pathEndpointRegister = `${environment.hosts.local}${this._pathEndpointRegister}`;
    this.pathEndpointForgot = `${environment.hosts.local}${this._pathEndpointForgot}`;
    this.pathEndpointReset = `${environment.hosts.local}${this._pathEndpointReset}`;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Realiza a autenticação do usuário.
   * @param {CredenciaisDTO} creds
   * @returns {Observable<any>}
   * @memberof AuthenticationService
   */
  login(creds: CredenciaisDTO): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(this.pathEndpointLogin, creds, {
        headers: this.baseHttpHeader,
      })
      .pipe(
        retry(1),
        tap((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('currentUser', JSON.stringify(res.user[0]));
        }),
        catchError(HandleError.handleError)
      );
  }

  /**
   * Registrar novo Usuário.
   * @param {NewUserDTO} creds
   * @returns {Observable<NewUserDTO>}
   * @memberof AuthenticationService
   */
  register(userInfo: NewUserDTO): Observable<NewUserDTO> {
    return this.http
      .post<NewUserDTO>(this.pathEndpointRegister, userInfo, {
        headers: this.baseHttpHeader,
      })
      .pipe(retry(1), catchError(HandleError.handleError));
  }

  /**
   * Envia um e-mail para recuperação de senha.
   * @param {string} email
   * @returns {Observable<any>}
   * @memberof AuthenticationService
   */
  forgot(email: string): Observable<any> {
    const data = {
      email,
    };
    return this.http
      .post<any>(this.pathEndpointForgot, data, {
        headers: this.baseHttpHeader,
      })
      .pipe(retry(1), catchError(HandleError.handleError));
  }

  /**
   * Reseta a senha do usuário por e-mail.
   * @param {ResetPasswordDTO} creds
   * @returns {Observable<any>}
   * @memberof AuthenticationService
   */
  resetPassword(creds: ResetPasswordDTO): Observable<any> {
    return this.http
      .post<any>(this.pathEndpointReset, creds, {
        headers: this.baseHttpHeader,
      })
      .pipe(retry(1), catchError(HandleError.handleError));
  }

  /**
   * Desloga do sistema e remove as credênciais do storage.
   * @memberof AuthenticationService
   */
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.http.get<any>(`${this.baseURL}/app/logout`).subscribe();
  }

  /**
   * Retorna as informações do usuário.
   * @returns {Observable<any>}
   * @memberof AuthenticationService
   */
  getAuthUser(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/app/login`);
  }
}
