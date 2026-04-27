// This service handles business logic and API communication for customers.
// It keeps data operations separate from the UI components.

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Customers Service - Handles all customer-related API calls
 * Base URL: http://localhost:9090/api/customers
 * Team Member: Abinaya
 */
@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:9090/api/customers';

  // Returns the request headers needed for the current backend call.
  /**
   * Get HTTP headers with authentication
   * Uses session storage or fallback credentials
   */
  private getHeaders(): { headers: HttpHeaders; withCredentials: boolean } {
    const auth = sessionStorage.getItem('authCredentials');
    const username = sessionStorage.getItem('loggedInUser') || 'abinaya';
    const password = 'abi123';
    const fallback = btoa(username + ':' + password);

    return {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + (auth || fallback),
      }),
      withCredentials: true,
    };
  }

  // Returns all available customer records from the backend service.
  /**
   * Get all customers
   * Endpoint: GET /api/customers
   */
  getAllCustomers(): Observable<any> {
    return this.http.get(this.BASE_URL, this.getHeaders());
  }

  // Returns the customer record that matches the provided identifier.
  /**
   * Get customer by ID
   * Endpoint: GET /api/customers/{customerId}
   */
  getCustomerById(customerId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/${customerId}`,
      this.getHeaders()
    );
  }

  // Returns filtered customer records based on the provided search value.
  /**
   * Get customer by email
   * Endpoint: GET /api/customers/search
   */
  getCustomerByEmail(email: string): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/search?email=${email}`,
      this.getHeaders()
    );
  }

  // Returns the required customer data for the current request.
  /**
   * Get customer orders
   * Endpoint: GET /api/customers/{customerId}/orders
   */
  getCustomerOrders(customerId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/${customerId}/orders`,
      this.getHeaders()
    );
  }

  // Returns the required customer data for the current request.
  /**
   * Get customer shipments
   * Endpoint: GET /api/customers/{customerId}/shipments
   */
  getCustomerShipments(customerId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/${customerId}/shipments`,
      this.getHeaders()
    );
  }

  // Sends a request to create a new customer record with the provided data.
  /**
   * Create a new customer
   * Endpoint: POST /api/customers
   * Required fields: fullName, emailAddress
   */
  createCustomer(customer: any): Observable<any> {
    return this.http.post(this.BASE_URL, customer, this.getHeaders());
  }

  // Sends a request to update the selected customer record with the provided data.
  /**
   * Update an existing customer
   * Endpoint: PUT /api/customers/{customerId}
   */
  updateCustomer(customerId: number, customer: any): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/${customerId}`,
      customer,
      this.getHeaders()
    );
  }

  // Sends a request to delete the selected customer record using its identifier.
  /**
   * Delete a customer
   * Endpoint: DELETE /api/customers/{customerId}
   */
  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL}/${customerId}`,
      this.getHeaders()
    );
  }
}
