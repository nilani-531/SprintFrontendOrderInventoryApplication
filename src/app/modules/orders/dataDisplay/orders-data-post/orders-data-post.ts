import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../orders-service';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders-data-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders-data-post.html',
  styleUrl: './orders-data-post.css',
})
export class OrdersDataPost {
  ordersService: OrdersService = inject(OrdersService);
  change: ChangeDetectorRef = inject(ChangeDetectorRef);
  router = inject(Router);

  // ✅ FORM
  orderForm = new FormGroup({
    customerId: new FormControl('', [Validators.required]),
    storeId: new FormControl('', [Validators.required]),
    orderStatusS: new FormControl('OPEN', [Validators.required]), // 🔥 FIXED ENUM
    orderTms: new FormControl('', [Validators.required]),
  });

  error: any = null;
  success: any = null;

  // ✅ SUBMIT FUNCTION
  handleSubmit() {
    console.log('RAW FORM:', this.orderForm.value);

    if (this.orderForm.invalid) {
      this.error = 'Please fill all required fields';
      this.success = null;
      this.change.detectChanges();
      return;
    }

    const formValue: any = this.orderForm.value;

    // 🔥 FIX DATETIME FORMAT
    const payload = {
      customerId: Number(formValue.customerId),
      storeId: Number(formValue.storeId),
      orderStatusS: formValue.orderStatusS || 'OPEN',
      orderTms: formValue.orderTms + ':00', // IMPORTANT
    };

    console.log('FINAL PAYLOAD:', payload);

    this.ordersService.createOrder(payload).subscribe({
      // ✅ SUCCESS
      next: (data: any) => {
        this.success = data.msg + ' with Order ID: ' + data.data.orderId;
        this.error = null;

        // reset form properly
        this.orderForm.reset({
          customerId: '',
          storeId: '',
          orderStatusS: 'OPEN',
          orderTms: '',
        });

        this.change.detectChanges();
      },

      // ❌ ERROR HANDLING
      error: (err: HttpErrorResponse) => {
        console.error('FULL ERROR:', err);

        this.error = this.extractErrorMessage(err);
        this.success = null;
        this.change.detectChanges();
      },
    });
  }

  goBack() {
    this.router.navigate(['/modules/orders']);
  }

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
