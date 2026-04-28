// This component creates new order item records from user input.
// It sends form data to the backend for the add operation.

import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderItemsService } from '../../orderitems-service';

@Component({
  selector: 'app-order-items-data-post',
  imports: [ReactiveFormsModule],
  templateUrl: './order-items-data-post.html',
  styleUrl: './order-items-data-post.css',
})
export class OrderItemsDataPost {
  orderItemsService: OrderItemsService = inject(OrderItemsService);
  change: ChangeDetectorRef = inject(ChangeDetectorRef);
  router = inject(Router);

  // Form for creating new order item
  orderItemForm = new FormGroup({
    orderId: new FormControl('', [Validators.required, Validators.min(1)]),
    productId: new FormControl('', [Validators.required, Validators.min(1)]),
    quantity: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(10000)
    ]),
    unitPrice: new FormControl('', [
      Validators.required,
      Validators.min(0.01),
      Validators.max(999999)
    ])
  });

  error: any = null;
  success: any = null;

  // Handles submit and updates the related state safely.
  handleSubmit() {
    if (this.orderItemForm.invalid) {
      this.error = 'Please fill all fields correctly';
      this.success = null;
      this.change.detectChanges();
      return;
    }

    const payload = {
      orderId: Number(this.orderItemForm.value.orderId),
      productId: Number(this.orderItemForm.value.productId),
      quantity: Number(this.orderItemForm.value.quantity),
      unitPrice: Number(this.orderItemForm.value.unitPrice),
    };

    console.log('Sending:', payload);

    const orderId = Number(this.orderItemForm.value.orderId);
    const itemData = {
      quantity: Number(this.orderItemForm.value.quantity),
      unitPrice: Number(this.orderItemForm.value.unitPrice),
    };

    this.orderItemsService
      .addItemToOrder(orderId, Number(this.orderItemForm.value.productId), itemData)
      .subscribe({
        next: (res: any) => {
          this.success = `Item Added ✅ (ID: ${res.data?.lineItemId || 'Success'})`;
          this.error = null;

          this.orderItemForm.reset();
          this.change.detectChanges();
        },

        error: (err: any) => {
          console.error('FULL ERROR:', err);

          this.success = null;

          if (err.error?.msg) {
            this.error = err.error.msg; // backend message
          } else this.error = this.extractErrorMessage(err);
          this.success = null;
          this.change.detectChanges();
        },
      });
  }

  // Returns to the previous screen or parent module page.
  goBack() {
    this.router.navigate(['/modules/order-items']);
  }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any): string {
    return err?.error?.msg || err?.error?.message || err?.message || 'An error occurred while processing the request.';
  }
}
