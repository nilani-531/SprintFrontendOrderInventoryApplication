import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgIf, NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  imports: [NgIf, NgForOf, ReactiveFormsModule],
  templateUrl: './products-data-get.html',
  styleUrl: './products-data-get.css'
})
export class ProductsDataGet {

  form: FormGroup;

  singleProduct: Product | null = null;
  allProducts: Product[] = [];

  loading = false;
  error = '';

  private baseUrl = 'http://localhost:9090/api/products';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      productId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // 🔹 Common Auth Header
  private getHeaders() {
    const auth = sessionStorage.getItem('authCredentials');

    return {
      headers: new HttpHeaders({
        Authorization: `Basic ${auth}`
      })
    };
  }

  // 🔹 Get Product by ID
  getProductById() {
    if (this.form.invalid) {
      this.error = 'Please enter a valid Product ID';
      return;
    }

    const id = this.form.value.productId;

    this.resetData();
    this.loading = true;

    this.http.get<any>(`${this.baseUrl}/${id}`, this.getHeaders())
      .subscribe({
        next: (res) => {
          this.singleProduct = res.data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.error = this.extractErrorMessage(err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  // 🔹 Get All Products
  getAllProducts() {
    this.resetData();
    this.loading = true;

    this.http.get<any>(this.baseUrl, this.getHeaders())
      .subscribe({
        next: (res) => {
          this.allProducts = res.data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.error = this.extractErrorMessage(err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  // 🔹 Better Error Message
  private extractErrorMessage(err: any): string {

    if (err.status === 401) return 'Unauthorized - Please Login First';
    if (err.status === 404) return 'Product Not Found';
    if (err.status === 0) return 'Backend Server Not Running';

    return err?.error?.msg ||
           err?.error?.data ||
           err?.message ||
           'Something went wrong';
  }

  // 🔹 Reset UI
  resetData() {
    this.error = '';
    this.singleProduct = null;
    this.allProducts = [];
  }
}