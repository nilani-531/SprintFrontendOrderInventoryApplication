// This service handles business logic and API communication for products.
// It keeps data operations separate from the UI components.

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Products Service - Handles all product-related API calls
 * Base URL: http://localhost:9090/api/products
 */
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:9090/api/products';

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

  // Returns all available product records from the backend service.
  /**
   * Get all products
   * Endpoint: GET /api/products
   */
  getAllProducts(): Observable<any> {
    return this.http.get(this.BASE_URL, this.getHeaders());
  }

  // Returns the product record that matches the provided identifier.
  /**
   * Get product by ID
   * Endpoint: GET /api/products/{productId}
   * @param productId - Product ID to fetch
   */
  getProductById(productId: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${productId}`, this.getHeaders());
  }

  // Sends a request to create a new product record with the provided data.
  /**
   * Create a new product
   * Endpoint: POST /api/products
   * @param product - Product object with productName and unitPrice
   */
  createProduct(product: any): Observable<any> {
    return this.http.post(this.BASE_URL, product, this.getHeaders());
  }

  // Sends a request to update the selected product record with the provided data.
  /**
   * Update an existing product
   * Endpoint: PUT /api/products/{productId}
   * @param productId - Product ID to update
   * @param product - Updated product data
   */
  updateProduct(productId: number, product: any): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/${productId}`,
      product,
      this.getHeaders()
    );
  }

  // Sends a request to delete the selected product record using its identifier.
  /**
   * Delete a product
   * Endpoint: DELETE /api/products/{productId}
   * @param productId - Product ID to delete
   */
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL}/${productId}`,
      this.getHeaders()
    );
  }
}
