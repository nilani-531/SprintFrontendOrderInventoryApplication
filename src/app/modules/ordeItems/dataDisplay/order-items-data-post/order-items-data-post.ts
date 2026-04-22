import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderItemsService } from '../../orderitems-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-order-items-data-post',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order-items-data-post.html',
  styleUrl: './order-items-data-post.css',
})
export class OrderItemsDataPost {
  orderItemsService: OrderItemsService = inject(OrderItemsService);
  change: ChangeDetectorRef = inject(ChangeDetectorRef);

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
    this.error = "Please fill all fields correctly";
    this.success = null;
    this.change.detectChanges();
    return;
  }

  const payload = {
    orderId: Number(this.orderItemForm.value.orderId),
    productId: Number(this.orderItemForm.value.productId),
    quantity: Number(this.orderItemForm.value.quantity),
    unitPrice: Number(this.orderItemForm.value.unitPrice)
  };

  console.log("Sending:", payload);

  this.orderItemsService.createOrderItem(payload).subscribe({

    next: (res: any) => {
      this.success = `Item Added ✅ (ID: ${res.data.lineItemId})`;
      this.error = null;

      this.orderItemForm.reset();
      this.change.detectChanges();
    },

    error: (err) => {
      console.error("FULL ERROR:", err);

      this.success = null;

      if (err.error?.msg) {
        this.error = err.error.msg; // backend message
      } else if (err.status === 0) {
        this.error = "Server not reachable";
      } else if (err.status === 500) {
        this.error = "Server error (check duplicate / mapping)";
      } else {
        this.error = "Something went wrong";
      }

      this.change.detectChanges();
    }
  });
}
}


