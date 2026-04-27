import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { OrdersService } from '../../orders-service';
import { CommonModule, DatePipe } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-orders-data-delete',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgClass, DatePipe],
  templateUrl: './orders-data-delete.html',
  styleUrl: './orders-data-delete.css',
})
export class OrdersDataDelete {

  deleteForm: FormGroup;
  deletedOrder: any = null;

  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.deleteForm = this.fb.group({
      orderId: ['', [Validators.required, Validators.min(1)]]
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
    }, 4000);
  }

  deleteById() {
    this.deletedOrder = null;

    if (this.deleteForm.invalid) {
      this.showNotification('Please enter a valid Order ID', 'error');
      return;
    }

    const id = this.deleteForm.value.orderId;

    // First fetch the order so we can show its details after deletion
    this.ordersService.getOrderById(id).subscribe({
      next: (res: any) => {
        const orderData = res.data || res;

        this.ordersService.deleteOrder(id).subscribe({
          next: () => {
            this.deletedOrder = orderData;
            this.deleteForm.reset();
            this.cdr.detectChanges();
            this.showNotification(`Order #${id} deleted successfully`, 'success');
          },
          error: (err: HttpErrorResponse) => {
            const msg = err.error?.msg || err.error?.message || err.message || '';
            if (err.status === 404) {
              this.showNotification(`Order #${id} not found`, 'error');
            } else if (err.status === 0) {
              this.showNotification('Server is offline or unreachable', 'error');
            } else {
              this.showNotification(`Delete failed: ${msg || 'Unexpected error'}`, 'error');
            }
            this.cdr.detectChanges();
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.showNotification(`Order #${id} not found`, 'error');
        } else {
          this.showNotification('Could not fetch order for deletion', 'error');
        }
        this.cdr.detectChanges();
      }
    });
  }

  goBack() { this.router.navigate(['/modules/orders']); }
}
