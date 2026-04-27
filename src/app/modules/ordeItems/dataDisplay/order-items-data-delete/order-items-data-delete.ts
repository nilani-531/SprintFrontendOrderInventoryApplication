import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core'; 
import { OrderItemsService } from '../../orderitems-service';

@Component({
  selector: 'app-order-items-data-delete',
  imports: [ReactiveFormsModule],
  templateUrl: './order-items-data-delete.html',
  styleUrl: './order-items-data-delete.css',
})
export class OrderItemsDataDelete {
   deleteForm1: FormGroup;
  message: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder, 
    private orderItemsService: OrderItemsService,
    private cdr: ChangeDetectorRef 
  , private router: Router) {
    this.deleteForm1 = this.fb.group({
      orderId: ['', [Validators.required, Validators.min(1)]],
      lineItemId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  deletedItemDetails: any = null;

  deleteById() {
    this.message = '';
    this.error = '';
    this.deletedItemDetails = null;

    if (this.deleteForm1.invalid) {
      this.error = "Please enter a valid ID";
      return;
    }

    const orderId = this.deleteForm1.value.orderId;
    const lineItemId = this.deleteForm1.value.lineItemId;
   
    this.orderItemsService.getItemsByOrderId(orderId).subscribe({
      next: (res: any) => {
        const items = res.data || [];
        const itemToDelete = items.find((i: any) => i.lineItemId == lineItemId);

        if (!itemToDelete) {
          this.error = "Order item not found in the given order";
          this.cdr.detectChanges();
          return;
        }

        this.orderItemsService.deleteOrderItem(orderId, lineItemId).subscribe({
          next: () => {
            this.message = `Line item ${lineItemId} from order ${orderId} deleted successfully`;
            this.deletedItemDetails = itemToDelete;
            this.deleteForm1.reset();
            this.cdr.detectChanges(); 
          },
          error: (err: HttpErrorResponse) => {
            this.message = ''; 
            if (err.status === 404) {
              this.error = err.error?.msg || 'Order item not found';
            } else if (err.status === 400) {
               this.error = err.error?.msg || "Invalid Request";
            } else if (err.status === 0) {
              this.error = "Server is offline or unreachable";
            } else {
              this.error = "An unexpected error occurred";
            }
            this.cdr.detectChanges(); 
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        this.error = "Failed to fetch item for deletion";
        this.cdr.detectChanges();
      }
    });
  }

  goBack() { this.router.navigate(['/modules/order-items']); }

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
