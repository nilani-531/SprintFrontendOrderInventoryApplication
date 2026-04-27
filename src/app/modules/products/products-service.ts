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
   * Get all products
   * Endpoint: GET /api/products
   */
  getAllProducts(): Observable<any> {
    return this.http.get(this.BASE_URL, this.getHeaders());
  }

  /**
   * Get product by ID
   * Endpoint: GET /api/products/{productId}
   * @param productId - Product ID to fetch
   */
  getProductById(productId: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${productId}`, this.getHeaders());
  }

  /**
   * Create a new product
   * Endpoint: POST /api/products
   * @param product - Product object with productName and unitPrice
   */
  createProduct(product: any): Observable<any> {
    return this.http.post(this.BASE_URL, product, this.getHeaders());
  }

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
