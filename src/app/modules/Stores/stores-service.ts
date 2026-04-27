// This service handles business logic and API communication for stores.
// It keeps data operations separate from the UI components.

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Stores Service - Handles all store-related API calls
 * Base URL: http://localhost:9090/api/stores
 * Team Member: Pooja
 */
@Injectable({
  providedIn: 'root',
})
export class StoresService {
  private http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:9090/api/stores';

  // Returns the request headers needed for the current backend call.
  /**
   * Get HTTP headers with authentication
   * Uses session storage or fallback credentials
   */
  private getHeaders(): { headers: HttpHeaders; withCredentials: boolean } {
    const auth = sessionStorage.getItem('authCredentials');
    const username = sessionStorage.getItem('loggedInUser') || 'pooja';
    const password = 'poo123';
    const fallback = btoa(username + ':' + password);

    return {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + (auth || fallback),
      }),
      withCredentials: true,
    };
  }

  // Returns all available store records from the backend service.
  /**
   * Get all stores
   * Endpoint: GET /api/stores
   */
  getAllStores(): Observable<any> {
    return this.http.get(this.BASE_URL, this.getHeaders());
  }

  // Returns the store record that matches the provided identifier.
  /**
   * Get store by ID
   * Endpoint: GET /api/stores/{storeId}
   */
  getStoreById(storeId: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${storeId}`, this.getHeaders());
  }

  // Returns filtered store records based on the provided search value.
  /**
   * Get store by name
   * Endpoint: GET /api/stores/name/{storeName}
   */
  getStoreByName(storeName: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/name/${encodeURIComponent(storeName)}`, this.getHeaders());
  }

  // Returns the required store data for the current request.
  /**
   * Get store inventory
   * Endpoint: GET /api/stores/{storeId}/inventory
   */
  getStoreInventory(storeId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/${storeId}/inventory`,
      this.getHeaders()
    );
  }

  // Returns the required store data for the current request.
  /**
   * Get store orders
   * Endpoint: GET /api/stores/{storeId}/orders
   */
  getStoreOrders(storeId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/${storeId}/orders`,
      this.getHeaders()
    );
  }

  // Returns the required store data for the current request.
  /**
   * Get store shipments
   * Endpoint: GET /api/stores/{storeId}/shipments
   */
  getStoreShipments(storeId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/${storeId}/shipments`,
      this.getHeaders()
    );
  }

  // Sends a request to create a new store record with the provided data.
  /**
   * Create a new store
   * Endpoint: POST /api/stores
   * Required field: storeName
   */
  createStore(store: any): Observable<any> {
    return this.http.post(this.BASE_URL, store, this.getHeaders());
  }

  // Sends a request to update the selected store record with the provided data.
  /**
   * Update an existing store
   * Endpoint: PUT /api/stores/{storeId}
   */
  updateStore(storeId: number, store: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${storeId}`, store, this.getHeaders());
  }

  // Sends a request to delete the selected store record using its identifier.
  /**
   * Delete a store
   * Endpoint: DELETE /api/stores/{storeId}
   */
  deleteStore(storeId: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${storeId}`, this.getHeaders());
  }
}
