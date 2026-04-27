// This service handles business logic and API communication for inventory.
// It keeps data operations separate from the UI components.

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Inventory Service - Handles all inventory-related API calls
 * Base URL: http://localhost:9090/api/inventory
 */
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:9090/api/inventory';

  // Returns the request headers needed for the current backend call.
  /**
   * Get HTTP headers with authentication
   * Retrieves credentials from session storage
   */
  private getHeaders(): { headers: HttpHeaders; withCredentials: boolean } {
    const auth = sessionStorage.getItem('authCredentials');
    const username = sessionStorage.getItem('loggedInUser') || 'karthi';
    const password = 'kart123';
    const fallback = btoa(username + ':' + password);

    return {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + (auth || fallback),
      }),
      withCredentials: true,
    };
  }

  // Returns all available inventory records from the backend service.
  /**
   * Get all inventory records
   * Endpoint: GET /api/inventory
   */
  getAllInventory(): Observable<any> {
    return this.http.get(this.BASE_URL, this.getHeaders());
  }

  // Returns the inventory record that matches the provided identifier.
  /**
   * Get inventory record by ID
   * Endpoint: GET /api/inventory/{inventoryId}
   * @param inventoryId - Inventory ID to fetch
   */
  getInventoryById(inventoryId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/${inventoryId}`,
      this.getHeaders()
    );
  }

  // Returns filtered inventory records based on the provided search value.
  /**
   * Get inventory records by store
   * Endpoint: GET /api/inventory/store/{storeId}
   * @param storeId - Store ID to get inventory for
   */
  getInventoryByStore(storeId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/store/${storeId}`,
      this.getHeaders()
    );
  }

  // Returns filtered inventory records based on the provided search value.
  /**
   * Get inventory records by product
   * Endpoint: GET /api/inventory/product/{productId}
   * @param productId - Product ID to get inventory for
   */
  getInventoryByProduct(productId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/product/${productId}`,
      this.getHeaders()
    );
  }

  // Sends a request to create a new inventory record with the provided data.
  /**
   * Create a new inventory record
   * Endpoint: POST /api/inventory
   * @param inventory - Inventory object with storeId, productId, quantity
   */
  createInventory(inventory: any): Observable<any> {
    return this.http.post(this.BASE_URL, inventory, this.getHeaders());
  }

  // Sends a request to update the selected inventory record with the provided data.
  /**
   * Update an existing inventory record
   * Endpoint: PUT /api/inventory/{inventoryId}
   * @param inventoryId - Inventory ID to update
   * @param inventory - Updated inventory data
   */
  updateInventory(inventoryId: number, inventory: any): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/${inventoryId}`,
      inventory,
      this.getHeaders()
    );
  }

  // Sends a request to delete the selected inventory record using its identifier.
  /**
   * Delete an inventory record
   * Endpoint: DELETE /api/inventory/{inventoryId}
   * @param inventoryId - Inventory ID to delete
   */
  deleteInventory(inventoryId: number): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL}/${inventoryId}`,
      this.getHeaders()
    );
  }
}
