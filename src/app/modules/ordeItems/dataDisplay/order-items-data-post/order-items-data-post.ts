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
    orderId: new FormControl('', [Validators.required]),
    productId: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    unitPrice: new FormControl('', [Validators.required, Validators.min(0.01)]),
  });

  error: any = null;
  success: any = null;

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

  goBack() {
    this.router.navigate(['/modules/order-items']);
  }

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
