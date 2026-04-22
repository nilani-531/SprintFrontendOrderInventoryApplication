import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Order {
  orderId: number;
  customerId: number;
  storeId: number;
  orderStatusS: string;
  orderTms: string;
}

@Component({
  selector: 'app-orders-data-get',
  standalone: true,
  imports: [NgIf, NgForOf, ReactiveFormsModule],
  templateUrl: './orders-data-get.html',
  styleUrl: './orders-data-get.css',
})
export class OrdersDataGet {

  form: FormGroup;

  singleOrder: Order | null = null;
  allOrders: Order[] = [];

  loading = false;
  error = '';

  private baseUrl = 'http://localhost:9090/api/orders';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      orderId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // 🔹 Get Order by ID
  getOrderById() {

    if (this.form.invalid) {
      this.error = 'Please enter a valid Order ID (greater than 0)';
      return;
    }

    const id = this.form.value.orderId;

    this.resetData();
    this.loading = true;

    this.http.get<any>(`${this.baseUrl}/${id}`)
      .subscribe({
        next: (res) => {
          this.singleOrder = res.data;
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

  // 🔹 Get All Orders
  getAllOrders() {

    this.resetData();
    this.loading = true;

    this.http.get<any>(this.baseUrl)
      .subscribe({
        next: (res) => {
          this.allOrders = res.data;
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
    return err?.error?.msg || err?.error?.data || err?.message || 'Orders not found.';
  }

  // 🔹 Reset UI
  resetData() {
    this.error = '';
    this.singleOrder = null;
    this.allOrders = [];
  }
}
