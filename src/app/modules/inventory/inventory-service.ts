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

  /**
   * Get all inventory records
   * Endpoint: GET /api/inventory
   */
  getAllInventory(): Observable<any> {
    return this.http.get(this.BASE_URL, this.getHeaders());
  }

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

  /**
   * Create a new inventory record
   * Endpoint: POST /api/inventory
   * @param inventory - Inventory object with storeId, productId, quantity
   */
  createInventory(inventory: any): Observable<any> {
    return this.http.post(this.BASE_URL, inventory, this.getHeaders());
  }

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
