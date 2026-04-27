import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderItemsService } from '../../orderitems-service';

interface OrderItem {
  lineItemId: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

@Component({
  selector: 'app-order-items-data-put',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order-items-data-put.html',
  styleUrl: './order-items-data-put.css',
})
export class OrderItemsDataPut implements OnInit {

  lineItemForm!: FormGroup;

  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast: boolean = false;
  private toastTimeout: any;

  lineItemDetails: OrderItem | null = null;
  loading: boolean = false;

  constructor(
    private orderItemsService: OrderItemsService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.lineItemForm = new FormGroup({
      orderId: new FormControl('', [Validators.required, Validators.min(1)]),
      lineItemId: new FormControl('', [Validators.required, Validators.min(1)]),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
      unitPrice: new FormControl('', [Validators.required, Validators.min(0)])
    });

    const orderId = this.route.snapshot.params['orderId'];
    const lineItemId = this.route.snapshot.params['lineItemId'];

    if (orderId && lineItemId) {
      this.lineItemForm.patchValue({ orderId, lineItemId });
      this.loadLineItem();
    }
  }

  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info') {

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    this.cdr.detectChanges();

    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  // 🔍 LOAD ITEM
  loadLineItem() {

    const orderId = this.lineItemForm.get('orderId')?.value;
    const lineItemId = this.lineItemForm.get('lineItemId')?.value;

    if (!orderId || !lineItemId) {
      this.showNotification('Enter valid Order ID and Line Item ID', 'error');
      return;
    }

    this.loading = true;

    this.orderItemsService.getItemsByOrderId(orderId).subscribe({

      next: (res: any) => {

        const items = res.data || [];
        const found = items.find((i: OrderItem) => i.lineItemId == lineItemId);

        if (found) {
          this.lineItemDetails = found;

          this.lineItemForm.patchValue({
            quantity: found.quantity,
            unitPrice: found.unitPrice
          });

          this.showNotification('Item loaded successfully', 'info');
        } else {
          this.lineItemDetails = null;
          this.showNotification('Item not found', 'error');
        }

        this.loading = false;
      },

      error: () => {
        this.loading = false;
        this.lineItemDetails = null;
        this.showNotification('Failed to load item', 'error');
      }
    });
  }

  // ✏️ UPDATE
  handleUpdate() {

    if (this.lineItemForm.invalid || !this.lineItemDetails) {
      this.showNotification('Fill all fields properly', 'error');
      return;
    }

    const { orderId, lineItemId, quantity, unitPrice } = this.lineItemForm.value;

    this.loading = true;

    this.orderItemsService.updateOrderItem(orderId, lineItemId, { 
      quantity: Number(quantity), 
      unitPrice: Number(unitPrice) 
    }).subscribe({

      next: (res:any) => {
        this.showNotification(`Updated successfully ✅ (Line Item ID: ${lineItemId})`, 'success');
        this.loading = false;
      },

      error: () => {
        this.loading = false;
        this.showNotification('Update failed ❌', 'error');
      }
    });
  }

  searchLineItem() {
    this.loadLineItem();
  }

  goBack() {
    this.router.navigate(['/modules/order-items']);
  }
}