import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';

import { CredenciaisDTO } from './../interfaces/credenciais';
import { HandleError } from './../util/handle-error';
import { Injectable } from '@angular/core';
import { NewUserDTO } from './../interfaces/new-user';
import { UserDTO } from './../interfaces/user';
import { environment } from '../../../environments/environment';

const pathUpdatePassword = '/process-api/identity/users';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseHttpHeader: HttpHeaders;
  private baseURL: any;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private pathUpdatePassword: string;
  private pathEndpointLogin: string;
  private pathEndpointRegister: string;
  private readonly _pathEndpointLogin = '/login';
  private readonly _pathEndpointRegister = '/register';

  /**
   * Creates an instance of AuthenticationService.
   * @param {HttpClient} http
   * @memberof AuthenticationService
   */
  constructor(private http: HttpClient) {
    this.pathEndpointLogin = `${environment.hosts.local}${this._pathEndpointLogin}`;
    this.pathEndpointRegister = `${environment.hosts.local}${this._pathEndpointRegister}`;

    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
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
        tap(res => {
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
      .pipe(
        retry(1),
        catchError(HandleError.handleError)
      );
  }

  /**
   * Desloga do sistema e remove as credênciais do storage.
   * @memberof AuthenticationService
   */
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
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
