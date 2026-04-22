import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../orders-service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders-data-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './orders-data-post.html',
  styleUrl: './orders-data-post.css',
})
export class OrdersDataPost {

  ordersService: OrdersService = inject(OrdersService);
  change: ChangeDetectorRef = inject(ChangeDetectorRef);

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

    console.log("RAW FORM:", this.orderForm.value);

    if (this.orderForm.invalid) {
      this.error = "Please fill all required fields";
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
      orderTms: formValue.orderTms + ':00' // IMPORTANT
    };

    console.log("FINAL PAYLOAD:", payload);

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
          orderTms: ''
        });

        this.change.detectChanges();
      },

      // ❌ ERROR HANDLING
      error: (err: HttpErrorResponse) => {
        console.error("FULL ERROR:", err);

        if (err.status === 0) {
          this.error = 'Cannot connect to server (check backend/CORS)';
        }
        else if (err.error && err.error.msg) {
          this.error = err.error.msg;
        }
        else if (err.status === 400) {
          this.error = 'Invalid input (check values)';
        }
        else if (err.status === 404) {
          this.error = 'Customer or Store not found';
        }
        else if (err.status === 500) {
          this.error = 'Server error (check enum / DB / backend logs)';
        }
        else {
          this.error = 'Something went wrong';
        }

        this.success = null;
        this.change.detectChanges();
      }

    });
  }
}