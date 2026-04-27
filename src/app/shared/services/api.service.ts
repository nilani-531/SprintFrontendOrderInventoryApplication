import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private toast: ToastService) {}

  /**
   * Get HTTP headers with Authorization if available
   */
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const authCredentials = sessionStorage.getItem('authCredentials');
    if (authCredentials) {
      headers = headers.set('Authorization', `Basic ${authCredentials}`);
    }
    return headers;
  }

  /**
   * Build URL by replacing path parameters
   */
  buildUrl(urlTemplate: string, pathParams: Record<string, any>): string {
    let url = urlTemplate;
    for (const key of Object.keys(pathParams)) {
      url = url.replace(`{${key}}`, encodeURIComponent(pathParams[key]));
    }
    return url;
  }

  /**
   * Build query parameters, filtering out empty/null values
   */
  buildParams(queryParams: Record<string, any>): HttpParams {
    let params = new HttpParams();
    for (const key of Object.keys(queryParams)) {
      if (queryParams[key] !== '' && queryParams[key] !== null && queryParams[key] !== undefined) {
        params = params.set(key, queryParams[key]);
      }
    }
    return params;
  }

  /**
   * GET request
   */
  get(url: string, queryParams: Record<string, any> = {}): Observable<any> {
    const params = this.buildParams(queryParams);
    const headers = this.getHeaders();
    return this.http.get(url, { params, headers }).pipe(catchError(this.handleError.bind(this)));
  }

  /**
   * POST request
   */
  post(url: string, body: any, queryParams: Record<string, any> = {}): Observable<any> {
    const params = this.buildParams(queryParams);
    const headers = this.getHeaders();
    return this.http.post(url, body, { params, headers }).pipe(catchError(this.handleError.bind(this)));
  }

  /**
   * PUT request
   */
  put(url: string, body: any, queryParams: Record<string, any> = {}): Observable<any> {
    const params = this.buildParams(queryParams);
    const headers = this.getHeaders();
    return this.http.put(url, body, { params, headers }).pipe(catchError(this.handleError.bind(this)));
  }

  /**
   * PATCH request
   */
  patch(url: string, queryParams: Record<string, any> = {}): Observable<any> {
    const params = this.buildParams(queryParams);
    const headers = this.getHeaders();
    return this.http.patch(url, null, { params, headers }).pipe(catchError(this.handleError.bind(this)));
  }

  /**
   * DELETE request
   */
  delete(url: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(url, { headers }).pipe(catchError(this.handleError.bind(this)));
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: any): Observable<never> {
    const status = error?.status;
    const serverMsg =
      error?.error?.msg ||
      error?.error?.message ||
      error?.message ||
      'Request failed';

    const label = status ? `HTTP ${status}` : 'Error';
    this.toast.show(`${label}: ${serverMsg}`, 'error');
    return throwError(() => error);
  }
}
