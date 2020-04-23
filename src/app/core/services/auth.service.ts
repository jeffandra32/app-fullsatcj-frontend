import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';

import { CredenciaisDTO } from './../interfaces/credenciais.dto';
import { HandleError } from './../util/handle-error';
import { Injectable } from '@angular/core';
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
  private pathEndpoint: string;
  private readonly _pathEndpoint = '/login';

  /**
   * Creates an instance of AuthenticationService.
   * @param {HttpClient} http
   * @memberof AuthenticationService
   */
  constructor(private http: HttpClient) {
    this.pathEndpoint = `${environment.hosts.local}${this._pathEndpoint}`;

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
  login(creds: CredenciaisDTO): Observable<CredenciaisDTO> {
    return this.http
      .post<CredenciaisDTO>(this.pathEndpoint, creds, {
        headers: this.baseHttpHeader,
      })
      .pipe(
        retry(1),
        tap(res => {
          console.log(res);
          
          //localStorage.setItem('token', JSON.stringify(res));
        }),
        catchError(HandleError.handleError)
      );
  }

  /**
   * Desloga do sistema e remove as credênciais do storage.
   * @memberof AuthenticationService
   */
  logout() {
    localStorage.removeItem('currentUser');
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

  /**
   * Atualizar a senha do usuário
   * @param {string} userId
   * @param {string} password
   * @returns {Observable<any>}
   * @memberof AuthenticationService
   */
  updatePassword(userId: string, password: string): Observable<any> {
    const endpoint = `${this.pathUpdatePassword}/${userId}`;

    return this.http
      .put(endpoint, password, { headers: this.baseHttpHeader })
      .pipe(retry(1), catchError(HandleError.handleError));
  }
}
