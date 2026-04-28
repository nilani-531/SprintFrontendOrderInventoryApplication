// This component updates existing order records.
// It is used when the user wants to replace saved data with new values.

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass, CommonModule } from '@angular/common';
import { OrdersService } from '../../orders-service';

@Component({
  selector: 'app-orders-data-put',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './orders-data-put.html',
  styleUrl: './orders-data-put.css',
})
export class OrdersDataPut implements OnInit {
  orderForm!: FormGroup;
  orderDetails: any = null;
  loading: boolean = false;

  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast: boolean = false;



  // Initializes this component and prepares the dependencies used in the file.
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  // Runs when the component loads and prepares the initial data and screen state.
  ngOnInit(): void {
    this.orderForm = new FormGroup({
      orderId: new FormControl('', [Validators.required, Validators.min(1)]),
      storeId: new FormControl(''),
      customerId: new FormControl(''),
      orderDate: new FormControl(''),
    });
  }

  // Displays a toast message for the latest success or error response.
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

  // Searches the available order records using the current input value.
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
        // orderTms is the real field name in this backend
        const rawDate = this.orderDetails.orderTms;
        this.orderForm.patchValue({
          storeId: this.orderDetails.storeId,
          customerId: this.orderDetails.customerId,
          orderDate: rawDate ? rawDate.substring(0, 16) : '',
        });
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification('Order loaded successfully', 'info');
      },
      error: () => {
        this.orderDetails = null;
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification('Order not found', 'error');
      },
    });
  }

  // Handles update and updates the related state safely.
  handleUpdate(): void {
    if (!this.orderDetails) {
      this.showNotification('Search for an order first', 'error');
      return;
    }

    const orderId = this.orderForm.get('orderId')?.value;
    const newStoreId  = this.orderForm.get('storeId')?.value;
    const newCustomerId = this.orderForm.get('customerId')?.value;
    const newOrderDate = this.orderForm.get('orderDate')?.value; // from datetime-local: "2023-01-18T18:30"

    const currentTms = this.orderDetails.orderTms; // e.g. "2023-01-18T10:00:00"

    const storeChanged    = newStoreId && +newStoreId !== this.orderDetails.storeId;
    const customerChanged = newCustomerId && +newCustomerId !== this.orderDetails.customerId;
    const dateChanged     = newOrderDate && newOrderDate !== (currentTms ? currentTms.substring(0, 16) : '');

    if (!storeChanged && !customerChanged && !dateChanged) {
      this.showNotification('No changes detected to update', 'info');
      return;
    }

    this.loading = true;
    const updates: Promise<any>[] = [];



    // PUT storeId if changed (separate call — backend handles one at a time)
    if (storeChanged) {
      updates.push(this.ordersService.updateOrder(orderId, { storeId: +newStoreId }).toPromise());
    }

    // PUT customerId if changed
    if (customerChanged) {
      updates.push(this.ordersService.updateOrder(orderId, { customerId: +newCustomerId }).toPromise());
    }

    // PUT orderTms if changed — Spring expects ISO_DATE_TIME: "2023-01-18T18:30:00"
    if (dateChanged) {
      // datetime-local gives "2023-01-18T18:30" — append ":00" for full ISO format
      const isoTms = newOrderDate.length === 16 ? newOrderDate + ':00' : newOrderDate;
      updates.push(this.ordersService.updateOrderTms(orderId, isoTms).toPromise());
    }

    Promise.all(updates)
      .then((results) => {
        const lastRes = results[results.length - 1];
        if (lastRes?.data) this.orderDetails = lastRes.data;
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification(`Order #${orderId} updated successfully`, 'success');
      })
      .catch((err) => {
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification(
          'Update failed: ' + (err?.error?.msg || err?.error?.message || err?.message || 'Unknown error'),
          'error'
        );
      });
  }

  // Returns to the previous screen or parent module page.
  goBack(): void {
    this.router.navigate(['/modules/orders']);
  }
}
