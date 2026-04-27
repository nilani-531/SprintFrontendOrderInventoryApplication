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

  constructor(
    private orderItemsService: OrderItemsService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onOptionSelected(option: string) {
    this.selectedOption = option;
    this.resetData();
  }

  isInputValid(): boolean {
    return !!this.inputId && this.inputId > 0;
  }

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

  getItemsByOrder() {
    this.resetData();
    this.loading = true;
    this.orderItemsService.getItemsByOrderId(this.form.value.id).subscribe({
      next: (res: any) => {
        this.orderItems = res.data;
        this.currentPage = 1;
        this.updatePaginated();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = this.extractErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  updatePaginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedItems = this.orderItems.slice(start, start + this.itemsPerPage);
  }

  getTotalPages(): number {
    return Math.ceil(this.orderItems.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePaginated();
    }
  }

  private extractErrorMessage(err: any): string {
    return err?.error?.msg || err?.error?.data || err?.message || 'Order items not found.';
  }

  resetData() {
    this.error = '';
    this.orderItems = [];
    this.paginatedItems = [];
    this.totalQuantity = null;
    this.currentPage = 1;
  }
}
