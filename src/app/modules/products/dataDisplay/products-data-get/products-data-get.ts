// This component fetches and displays product records.
// It is used for the read or view operation in this module.

import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProductGetNavbar } from '../product-get-navbar/product-get-navbar';

interface Product {
  productId: number;
  productName: string;
  unitPrice: number;
  colour: string;
  brand: string;
  size: string;
  rating: number;
}

@Component({
  selector: 'app-products-data-get',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ProductGetNavbar],
  templateUrl: './products-data-get.html',
  styleUrl: './products-data-get.css',
})
export class ProductsDataGet {
  form: FormGroup;
  selectedOption = '';
  productId!: number;

  singleProduct: Product | null = null;
  allProducts: Product[] = [];
  paginatedProducts: Product[] = [];

  // Pagination properties
  itemsPerPage: number = 10;
  currentPage: number = 1;

  loading = false;
  error = '';

  private baseUrl = 'http://localhost:9090/api/products';

  // Initializes this component and prepares the dependencies used in the file.
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      productId: ['', [Validators.required, Validators.min(1)]],
    });
  }

  // Stores the selected option and resets the screen for the next request.
  onOptionSelected(option: string) {
    this.selectedOption = option;
    this.resetData();
  }

  // Checks whether the current input values are valid for the selected request.
  isInputValid(): boolean {
    if (this.selectedOption === 'getAll') return true;
    if (this.selectedOption === 'getById') return !!this.productId && this.productId > 0;
    return false;
  }

  // Calls the selected API endpoint and updates the screen with the response.
  fetchData() {
    if (!this.isInputValid()) {
      this.error = 'Please provide valid input';
      return;
    }
    if (this.selectedOption === 'getAll') {
      this.getAllProducts();
      return;
    }
    if (this.selectedOption === 'getById') {
      this.form.patchValue({ productId: this.productId });
      this.getProductById();
    }
  }

  // Returns the request headers needed for the current backend call.
  // 🔹 Common Auth Header
  private getHeaders() {
    const auth = sessionStorage.getItem('authCredentials');

    return {
      headers: new HttpHeaders({
        Authorization: `Basic ${auth}`,
      }),
    };
  }

  // Returns the product record that matches the provided identifier.
  // 🔹 Get Product by ID
  getProductById() {
    if (this.form.invalid) {
      this.error = 'Please enter a valid Product ID';
      return;
    }

    const id = this.form.value.productId;

    this.resetData();
    this.loading = true;

    this.http.get<any>(`${this.baseUrl}/${id}`, this.getHeaders()).subscribe({
      next: (res) => {
        this.singleProduct = res.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = this.extractErrorMessage(err, id);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Returns all available product records from the backend service.
  // 🔹 Get All Products
  getAllProducts() {
    this.resetData();
    this.loading = true;

    this.http.get<any>(this.baseUrl, this.getHeaders()).subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.currentPage = 1;
        this.updatePaginatedProducts();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = this.extractErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Extracts a readable error message from the current API response.
  // 🔹 Better Error Message
  private extractErrorMessage(err: any, id?: any): string {
    let message: string;
    if (err.status === 401) message = 'Unauthorized - Please Login First';
    else if (err.status === 404) message = 'Product Not Found';
    else if (err.status === 0) message = 'Backend Server Not Running';
    else message = err?.error?.msg || err?.error?.data || err?.message || 'Something went wrong';

    if (id !== undefined) {
      message += ` (ID: ${id})`;
    }
    return message;
  }

  // Handles reset data for the current component without changing the workflow.
  // 🔹 Reset UI
  resetData() {
    this.error = '';
    this.singleProduct = null;
    this.allProducts = [];
  }

  // Sends a request to update the selected product record with the provided data.
  // 🔹 Pagination Methods
  updatePaginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.allProducts.slice(start, end);
  }

  // Returns the required product data for the current request.
  getTotalPages(): number {
    return Math.ceil(this.allProducts.length / this.itemsPerPage);
  }

  // Moves to the selected page and refreshes the visible results as needed.
  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }
}
