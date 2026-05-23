// This component fetches and displays order item records.
// It is used for the read or view operation in this module.

import { Component, ChangeDetectorRef } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { OrderItemsService } from '../../orderitems-service';
import { OrderItemsGetNavbar } from '../order-items-get-navbar/order-items-get-navbar';

interface OrderItem {
  lineItemId: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

@Component({
  selector: 'app-order-items-data-get',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, OrderItemsGetNavbar],
  templateUrl: './order-items-data-get.html',
  styleUrl: './order-items-data-get.css',
})
export class OrderItemsDataGet {
  form: FormGroup;
  selectedOption = '';
  inputId!: number;

  orderItems: OrderItem[] = [];
  paginatedItems: OrderItem[] = [];
  totalQuantity: number | null = null;

  itemsPerPage: number = 10;
  currentPage: number = 1;

  loading = false;
  error = '';

  // Initializes this component and prepares the dependencies used in the file.
  constructor(
    private orderItemsService: OrderItemsService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.min(1)]],
    });
  }

  // Stores the selected option and resets the screen for the next request.
  onOptionSelected(option: string) {
    this.selectedOption = option;
    this.resetData();
  }

  // Checks whether the current input values are valid for the selected request.
  isInputValid(): boolean {
    return !!this.inputId && this.inputId > 0;
  }

  // Calls the selected API endpoint and updates the screen with the response.
  fetchData() {
    if (!this.isInputValid()) {
      this.error = 'Please provide valid input';
      return;
    }
    this.form.patchValue({ id: this.inputId });
    switch (this.selectedOption) {
      case 'getByOrder':
        this.getItemsByOrder();
        break;

      default:
        this.error = 'Please choose an endpoint';
    }
  }

  // Returns filtered order item records based on the provided search value.
  getItemsByOrder() {
    this.resetData();
    this.loading = true;
    this.orderItemsService.getItemsByOrderId(this.form.value.id).subscribe({
      next: (res: any) => {
        if (!res.data || res.data.length === 0) {
          this.error = 'No order items found for this order id.';
        } else {
          this.orderItems = res.data;
          this.currentPage = 1;
          this.updatePaginated();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = this.extractErrorMessage(err, this.form.value.id);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Sends a request to update the selected order item record with the provided data.
  updatePaginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedItems = this.orderItems.slice(start, start + this.itemsPerPage);
  }

  // Returns the required order item data for the current request.
  getTotalPages(): number {
    return Math.ceil(this.orderItems.length / this.itemsPerPage);
  }

  // Moves to the selected page and refreshes the visible results as needed.
  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePaginated();
    }
  }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any, id?: any): string {
    let message = err?.error?.msg || err?.error?.data || err?.message || 'Order items not found.';
    return message;
  }

  // Handles reset data for the current component without changing the workflow.
  resetData() {
    this.error = '';
    this.orderItems = [];
    this.paginatedItems = [];
    this.totalQuantity = null;
    this.currentPage = 1;
  }
}
