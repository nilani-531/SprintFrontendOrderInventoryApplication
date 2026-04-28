// This component updates existing inventory records.
// It is used when the user wants to replace saved data with new values.

import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InventoryDataService } from '../inventory-data.service';

@Component({
  selector: 'app-inventory-data-put',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './inventory-data-put.html',
  styleUrl: './inventory-data-put.css',
})
export class InventoryDataPut implements OnInit {

  inventoryForm!: FormGroup;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast: boolean = false;
  loading = false;
  inventoryDetails: any = null;

  private inventoryService = inject(InventoryDataService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  // Initializes this component and prepares the dependencies used in the file.
  constructor() { }

  // Displays a toast message for the latest success or error response.
  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    this.cdr.detectChanges();
    setTimeout(() => { this.showToast = false; this.cdr.detectChanges(); }, 3000);
  }

  // Runs when the component loads and prepares the initial data and screen state.
  ngOnInit(): void {
    this.inventoryForm = new FormGroup({
      inventoryId: new FormControl('', [Validators.required, Validators.min(1)]),
      storeId: new FormControl('', [Validators.required, Validators.min(1)]),
      productId: new FormControl('', [Validators.required, Validators.min(1)]),
      productInventory: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  // Searches the available inventory records using the current input value.
  // 🔍 SEARCH INVENTORY
  searchInventory(): void {
    const id = this.inventoryForm.get('inventoryId')?.value;

    if (!id) {
      this.showNotification('Enter valid Inventory ID', 'error');
      return;
    }

    this.loading = true;

    this.inventoryService.getInventory(id).subscribe({
      next: (res: any) => {
        console.log('API Response:', res);
        this.inventoryDetails = res.data;

        this.inventoryForm.patchValue({
          storeId: res.data.storeId,
          productId: res.data.productId,
          productInventory: res.data.productInventory
        });

        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification('Inventory loaded successfully', 'info');
      },

      error: (err) => {
        console.error(err);
        this.inventoryDetails = null;
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification('Inventory not found ❌', 'error');
      }
    });
  }

  // Handles update and updates the related state safely.
  handleUpdate(): void {
    if (this.inventoryForm.invalid) {
      this.showNotification('Please fill all required fields', 'error');
      return;
    }

    this.loading = true;
    const inventoryId = this.inventoryForm.get('inventoryId')?.value;
    const storeId = this.inventoryForm.get('storeId')?.value;
    const productId = this.inventoryForm.get('productId')?.value;

    const payload = {
      productInventory: Number(this.inventoryForm.get('productInventory')?.value)
    };

    this.inventoryService.updateInventory(inventoryId, storeId, productId, payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.showNotification(`${res?.msg || 'Inventory updated successfully'} (ID: ${inventoryId})`, 'success');
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        console.error('Update failed', err);
        const errorMsg = err?.error?.msg || 'Failed to update inventory';
        this.showNotification(errorMsg, 'error');
        this.cdr.detectChanges();
      }
    });
  }

  // Returns to the previous screen or parent module page.
  goBack(): void {
    this.router.navigate(['/modules/inventory']);
  }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any): string {
    return err?.error?.msg || err?.error?.data || err?.message || 'An error occurred while processing the request.';
  }
}
