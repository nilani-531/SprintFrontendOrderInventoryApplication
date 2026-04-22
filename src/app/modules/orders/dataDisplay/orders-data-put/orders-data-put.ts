import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgClass, NgFor, CommonModule } from '@angular/common';

interface OrderDetail {
  orderId: number;
  customerId: number;
  storeId: number;
  orderStatusS: string;
  orderTms: string;
}

@Component({
  selector: 'app-orders-data-put',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgFor, CommonModule],
  templateUrl: './orders-data-put.html',
  styleUrl: './orders-data-put.css',
})
export class OrdersDataPut implements OnInit {

  orderForm!: FormGroup;

  orderDetails: OrderDetail | null = null;
  loading: boolean = false;

  // 🔥 Toast
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast: boolean = false;
  private toastTimeout: any = null;

  private baseUrl = 'http://localhost:9090/api/orders';

  orderStatuses = ['OPEN', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      orderId: new FormControl('', [Validators.required, Validators.min(1)]),
      orderStatusS: new FormControl('', [Validators.required])
    });
  }

  // 🔥 Toast (same as order-items → FIXES DOUBLE CLICK)
  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    this.cdr.detectChanges();

    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  // 🔍 SEARCH ORDER
  searchOrder(): void {
    const id = this.orderForm.get('orderId')?.value;

    if (!id) {
      this.showNotification('Enter valid Order ID', 'error');
      return;
    }

    this.loading = true;

    this.http.get<any>(`${this.baseUrl}/${id}`).subscribe({
      next: (res) => {
        this.orderDetails = res.data;

        this.orderForm.patchValue({
          orderStatusS: res.data.orderStatusS
        });

        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification('Order loaded successfully', 'info');
      },

      error: (err) => {
        console.error(err);
        this.orderDetails = null;
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification('Order not found ❌', 'error');
      }
    });
  }

  // 🔄 UPDATE STATUS
  handleUpdate(): void {
    if (this.orderForm.invalid || !this.orderDetails) {
      this.showNotification('Fill all fields properly', 'error');
      return;
    }

    const orderId = this.orderForm.get('orderId')?.value;
    const status = this.orderForm.get('orderStatusS')?.value;

    this.loading = true;

    this.http.put<any>(`${this.baseUrl}/${orderId}/status?status=${status}`, {})
      .subscribe({
        next: (res) => {
          this.orderDetails = res.data;
          this.loading = false;
          this.cdr.detectChanges();

          this.showNotification('Order updated successfully ✅', 'success');

          setTimeout(() => {
            this.router.navigate(['/orders/get-all']);
          }, 1500);
        },

        error: (err) => {
          console.error(err);
          this.loading = false;
          this.cdr.detectChanges();
          this.showNotification('Update failed ❌', 'error');
        }
      });
  }

  // 🔙 BACK
  goBack(): void {
    this.router.navigate(['/orders/get-all']);
  }
}