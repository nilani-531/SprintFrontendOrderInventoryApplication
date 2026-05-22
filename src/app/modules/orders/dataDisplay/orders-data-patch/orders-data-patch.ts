// This component updates only the status of an existing order.
// It is used for the PATCH operation.

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass, CommonModule } from '@angular/common';
import { OrdersService } from '../../orders-service';

@Component({
  selector: 'app-orders-data-patch',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './orders-data-patch.html',
  styleUrl: './orders-data-patch.css',
})
export class OrdersDataPatch implements OnInit {
  orderForm!: FormGroup;
  orderDetails: any = null;
  loading: boolean = false;

  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast: boolean = false;

  orderStatuses = ['OPEN', 'PAID', 'SHIPPED', 'COMPLETE', 'CANCELLED', 'REFUNDED'];

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      orderId: new FormControl('', [Validators.required, Validators.min(1)]),
      orderStatusS: new FormControl('', [Validators.required]),
    });
  }

  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  searchOrder(): void {
    const id = this.orderForm.get('orderId')?.value;
    if (!id) {
      this.showNotification('Enter valid Order ID', 'error');
      return;
    }
    this.loading = true;
    this.ordersService.getOrderById(id).subscribe({
      next: (res: any) => {
        this.orderDetails = res.data;
        this.orderForm.patchValue({
          orderStatusS: this.orderDetails.orderStatusS,
        });
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification('Order loaded successfully', 'info');
      },
      error: (err: any) => {
        this.orderDetails = null;
        this.loading = false;
        this.cdr.detectChanges();
        const msg = err.error?.msg || 'Order not found';
        this.showNotification(msg, 'error');
      },
    });
  }

  handlePatch(): void {
    if (!this.orderDetails) {
      this.showNotification('Search for an order first', 'error');
      return;
    }

    const orderId = this.orderForm.get('orderId')?.value;
    const newStatus = this.orderForm.get('orderStatusS')?.value;

    if (newStatus === this.orderDetails.orderStatusS) {
      this.showNotification('No changes detected to update', 'info');
      return;
    }

    this.loading = true;
    this.ordersService.updateOrderStatus(orderId, newStatus).subscribe({
      next: (res: any) => {
        if (res?.data) this.orderDetails = res.data;
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification(`Order #${orderId} status updated to ${newStatus}`, 'success');
      },
      error: (err) => {
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification(
          'Update failed: ' + (err?.error?.msg || err?.error?.message || err?.message || 'Unknown error'),
          'error'
        );
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/modules/orders']);
  }
}
