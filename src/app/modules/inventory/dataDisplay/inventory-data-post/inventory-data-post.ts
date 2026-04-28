// This component creates new inventory records from user input.
// It sends form data to the backend for the add operation.

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryDataService } from '../inventory-data.service';

@Component({
  selector: 'app-inventory-data-post',
  imports: [ReactiveFormsModule],
  templateUrl: './inventory-data-post.html',
  styleUrl: './inventory-data-post.css',
})
export class InventoryDataPost {
  inventoryService: InventoryDataService = inject(InventoryDataService);
  router = inject(Router);

  inventoryForm = new FormGroup({
    storeId: new FormControl('', [Validators.required, Validators.min(1)]),
    productId: new FormControl('', [Validators.required, Validators.min(1)]),
    productInventory: new FormControl('', [Validators.required, Validators.min(0)])
  });

  error: any = null;
  successMessage: string = '';

  // Handles submit and updates the related state safely.
  handleSubmit() {
    if (this.inventoryForm.valid) {
      const formValue = this.inventoryForm.value;
      const storeId = Number(formValue.storeId);
      const productId = Number(formValue.productId);
      const payload = { productInventory: Number(formValue.productInventory) };

      this.inventoryService.createInventory(storeId, productId, payload).subscribe({
        next: (data: any) => {
          this.successMessage = `Inventory created successfully! (ID: ${data.data?.inventoryId || ''})`;
          this.inventoryForm.reset();
          this.error = null;
        },
        error: (err) => {
          if (err.error && err.error.msg) {
            this.error = err.error.msg;
          } else if (err.status === 0) {
            this.error = 'Cannot connect to server';
          } else if (err.status === 404) {
            this.error = 'Store or Product not found';
          } else if (err.status === 400) {
            this.error = 'Invalid request data';
          } else {
            this.error = 'Something went wrong';
          }
          this.successMessage = '';
        }
      });
    }
  }

  // Returns to the previous screen or parent module page.
  goBack() { this.router.navigate(['/modules/inventory']); }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any): string {
    return err?.error?.msg || err?.error?.data || err?.message || 'An error occurred while processing the request.';
  }
}
