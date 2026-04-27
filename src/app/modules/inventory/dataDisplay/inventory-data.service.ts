// This service handles business logic and API communication for inventory.
// It keeps data operations separate from the UI components.

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryDataService {
  private baseUrl = 'http://localhost:9090/api/inventory';

  // Initializes this component and prepares the dependencies used in the file.
  constructor(private http: HttpClient) {}

  // Returns the request headers needed for the current backend call.
  private getHeaders() {
    const auth = sessionStorage.getItem('authCredentials');
    return {
      headers: new HttpHeaders({
        Authorization: auth ? `Basic ${auth}` : ''
      }),
      withCredentials: true
    };
  }

  // Returns all available inventory records from the backend service.
  getAllInventory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, this.getHeaders());
  }

  // Returns the required inventory data for the current request.
  getInventory(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, this.getHeaders());
  }

  // Returns filtered inventory records based on the provided search value.
  getInventoryByStore(storeId: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/store/${storeId}`, this.getHeaders());
  }

  // Returns filtered inventory records based on the provided search value.
  getInventoryByProduct(productId: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/product/${productId}`, this.getHeaders());
  }

  // Sends a request to create a new inventory record with the provided data.
  createInventory(storeId: string | number, productId: string | number, payload: any): Observable<any> {
    const params = new HttpParams()
      .set('storeId', storeId.toString())
      .set('productId', productId.toString());
    return this.http.post<any>(`${this.baseUrl}`, payload, { params, ...this.getHeaders() });
  }

  // Sends a request to update the selected inventory record with the provided data.
  updateInventory(inventoryId: string | number, storeId: string | number, productId: string | number, payload: any): Observable<any> {
    const params = new HttpParams()
      .set('storeId', storeId.toString())
      .set('productId', productId.toString());
    return this.http.put<any>(`${this.baseUrl}/${inventoryId}`, payload, { params, ...this.getHeaders() });
  }

  // Sends a request to delete the selected inventory record using its identifier.
  deleteInventory(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, this.getHeaders());
  }
}
