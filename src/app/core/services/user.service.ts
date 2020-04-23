import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import { AppConstants } from '../constants/shared.constants';
import { HandleError } from './../util/handle-error';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseHttpHeader: HttpHeaders;
  baseURL: string;
  pathEndpoint: string;
  pathEndpoint2: string;
  pathEndpointProcessByName: string;
  pathEndpointTaskByNameProcess: string;
  private readonly _pathEndpoint = '/usuario/listarUsuario';
  private readonly _pathEndpoint2 = 'usuario/listarGestor';

  /**
   * Creates an instance of ProcessService.
   * @param {HttpClient} http
   * @memberof ProcessService
   */
  constructor(private http: HttpClient) {
    this.pathEndpoint = `${environment.hosts.local}${this._pathEndpoint}`;
    this.pathEndpoint2 = `${environment.hosts.local}${this._pathEndpoint2}`;
    this.baseHttpHeader = AppConstants._baseHttpOptions;
  }

  /**
   * Retorna todas os processos
   * @returns {Observable<any>}
   * @memberof ProcessService
   */
  getAll(gestorId: string): Observable<any> {
    const getParams = new HttpParams().set('id', gestorId);
    return this.http
      .get<any>(this.pathEndpoint, {
        headers: this.baseHttpHeader,
        params: getParams,
      })
      .pipe(retry(1), catchError(HandleError.handleError));
  }

  /**
   * Retorna uma lista de Gestores.
   * @param {string} gestorId
   * @returns {Observable<any>}
   * @memberof UserService
   */
  getAllManager(gestorId: string): Observable<any> {
    const endpoint = `${this.pathEndpoint2}/${gestorId}`;
    return this.http
      .get<any>(endpoint, {
        headers: this.baseHttpHeader,
      })
      .pipe(retry(1), catchError(HandleError.handleError));
  }
}
