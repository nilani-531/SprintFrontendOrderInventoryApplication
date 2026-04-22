import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgForOf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface OrderItem {
  lineItemId: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

@Component({
  selector: 'app-order-items-data-get',
  standalone: true,
  imports: [NgIf, NgForOf, ReactiveFormsModule,CommonModule],
  templateUrl: './order-items-data-get.html',
  styleUrl: './order-items-data-get.css',
})
export class OrderItemsDataGet {

  form: FormGroup;
  queryType: 'order' | 'product' = 'order'; // Toggle between order ID and product ID

  orderItems: OrderItem[] = [];
  totalQuantity: number | null = null;

  loading = false;
  error = '';

  private baseUrl = 'http://localhost:9090/api/order-items';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // 🔹 Change query type
  setQueryType(type: 'order' | 'product') {
    this.queryType = type;
    this.resetData();
    this.form.reset();
  }

  // 🔹 Get Items by Order ID
  getItemsByOrder() {

    if (this.form.invalid) {
      this.error = 'Please enter a valid Order ID (greater than 0)';
      return;
    }

    const orderId = this.form.value.id;

    this.resetData();
    this.loading = true;

    this.http.get<any>(`${this.baseUrl}/${orderId}`)
      .subscribe({
        next: (res) => {
          this.orderItems = res.data;
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

  // 🔹 Get Items by Product ID
  getItemsByProduct() {

    if (this.form.invalid) {
      this.error = 'Please enter a valid Product ID (greater than 0)';
      return;
    }

    const productId = this.form.value.id;

    this.resetData();
    this.loading = true;

    this.http.get<any>(`${this.baseUrl}/products/${productId}`)
      .subscribe({
        next: (res) => {
          this.orderItems = res.data;
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

  // 🔹 Get Total Quantity by Product ID
  getTotalQuantity() {

    if (this.form.invalid) {
      this.error = 'Please enter a valid Product ID (greater than 0)';
      return;
    }

    const productId = this.form.value.id;

    this.resetData();
    this.loading = true;

    this.http.get<any>(`${this.baseUrl}/products/${productId}/quantity`)
      .subscribe({
        next: (res) => {
          this.totalQuantity = res.data;
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

  // 🔹 Extract backend error message properly
  private extractErrorMessage(err: any): string {
    return err?.error?.msg || err?.error?.data || err?.message || 'Order items not found.';
  }

  //  Reset UI
  resetData() {
    this.error = '';
    this.orderItems = [];
    this.totalQuantity = null;
  }
}
