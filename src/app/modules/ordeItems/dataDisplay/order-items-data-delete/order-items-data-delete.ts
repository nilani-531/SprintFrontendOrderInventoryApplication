// This component deletes selected order item records.
// It collects the required identifier and sends the remove request.

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

  // Initializes this component and prepares the dependencies used in the file.
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

  // Sends a request to delete the selected order item record using its identifier.
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
          this.error = `Order item not found in the given order (Order: ${orderId}, Line: ${lineItemId})`;
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
            const ctx = `${orderId}-${lineItemId}`;
            // Prefer backend message when available, otherwise provide a contextual message
            if (err.error?.msg) {
              this.error = err.error.msg + ` (Order: ${orderId}, Line: ${lineItemId})`;
            } else if (err.status === 404) {
              this.error = this.extractErrorMessage(err, ctx);
            } else if (err.status === 400) {
              this.error = this.extractErrorMessage(err, ctx);
            } else if (err.status === 0) {
              this.error = this.extractErrorMessage(err, ctx);
            } else {
              this.error = this.extractErrorMessage(err, ctx);
            }
            this.cdr.detectChanges();
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        this.error = `Failed to fetch item for deletion (Order: ${orderId}, Line: ${lineItemId})`;
        this.cdr.detectChanges();
      }
    });
  }

  // Returns to the previous screen or parent module page.
  goBack() { this.router.navigate(['/modules/order-items']); }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any, id?: any): string {
    let message = err?.error?.msg || err?.error?.data || err?.message || 'An error occurred while processing the request.';
    if (id !== undefined) message += ` (ID: ${id})`;
    return message;
  }
}
