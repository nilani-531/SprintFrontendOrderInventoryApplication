// This service handles business logic and API communication for products.
// It keeps data operations separate from the UI components.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  private baseUrl = 'http://localhost:9090/api/products';

  // Initializes this component and prepares the dependencies used in the file.
  constructor(private http: HttpClient) {}

  // Returns the request headers needed for the current backend call.
  private getHeaders() {
    const username = 'karthi';
    const password = 'karthi123';

    const auth = btoa(username + ':' + password);

    return {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + auth
      }),
      withCredentials: true
    };
  }

  // Returns all available product records from the backend service.
  getAllProducts(): Observable<any> {
    return this.http.get(this.baseUrl, this.getHeaders());
  }

  // Returns the required product data for the current request.
  getProduct(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.getHeaders());
  }

  // Sends a request to create a new product record with the provided data.
  createProduct(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data, this.getHeaders());
  }

  // Sends a request to update the selected product record with the provided data.
  updateProduct(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, this.getHeaders());
  }

  // Sends a request to delete the selected product record using its identifier.
  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.getHeaders());
  }
}