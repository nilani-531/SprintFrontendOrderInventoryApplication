// This service provides shared API helper methods used across the application.
// It keeps common backend request logic reusable and centralized.

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Initializes this component and prepares the dependencies used in the file.
  constructor(private http: HttpClient, private toast: ToastService) {}

  // Returns the request headers needed for the current backend call.
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

  // Builds the full backend URL for the requested API endpoint.
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

  // Builds the query parameters needed for the current API request.
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

  // Returns the required application data for the current request.
  /**
   * GET request
   */
  get(url: string, queryParams: Record<string, any> = {}): Observable<any> {
    const params = this.buildParams(queryParams);
    const headers = this.getHeaders();
    return this.http.get(url, { params, headers }).pipe(catchError(this.handleError.bind(this)));
  }

  // Sends a create request for the selected application record.
  /**
   * POST request
   */
  post(url: string, body: any, queryParams: Record<string, any> = {}): Observable<any> {
    const params = this.buildParams(queryParams);
    const headers = this.getHeaders();
    return this.http.post(url, body, { params, headers }).pipe(catchError(this.handleError.bind(this)));
  }

  // Sends an update request for the selected application record.
  /**
   * PUT request
   */
  put(url: string, body: any, queryParams: Record<string, any> = {}): Observable<any> {
    const params = this.buildParams(queryParams);
    const headers = this.getHeaders();
    return this.http.put(url, body, { params, headers }).pipe(catchError(this.handleError.bind(this)));
  }

  // Sends a partial update request for the selected application record.
  /**
   * PATCH request
   */
  patch(url: string, queryParams: Record<string, any> = {}): Observable<any> {
    const params = this.buildParams(queryParams);
    const headers = this.getHeaders();
    return this.http.patch(url, null, { params, headers }).pipe(catchError(this.handleError.bind(this)));
  }

  // Sends a request to delete the selected application record using its identifier.
  /**
   * DELETE request
   */
  delete(url: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(url, { headers }).pipe(catchError(this.handleError.bind(this)));
  }

  // Handles error and updates the related state safely.
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
