// This component deletes selected inventory records.
// It collects the required identifier and sends the remove request.

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { InventoryDataService } from '../inventory-data.service';

@Component({
  selector: 'app-inventory-data-delete',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inventory-data-delete.html',
  styleUrl: './inventory-data-delete.css',
})
export class InventoryDataDelete {
  deleteForm: FormGroup;
  message: string = '';
  error: string = '';
  deletedInventory: any = null;

  baseUrl = 'http://localhost:9090/api/inventory';

  private inventoryService = inject(InventoryDataService);
  router = inject(Router);

  // Initializes this component and prepares the dependencies used in the file.
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.deleteForm = this.fb.group({
      inventoryId: ['', [Validators.required, Validators.min(1)]],
    });
  }

  // Sends a request to delete the selected inventory record using its identifier.
  deleteById() {
    this.message = '';
    this.error = '';
    this.deletedInventory = null;

    if (this.deleteForm.invalid) {
      this.error = 'Please enter a valid ID';
      return;
    }

    const id = this.deleteForm.value.inventoryId;

    // 🔹 First fetch the inventory to display it after deletion
    this.inventoryService.getInventory(id).subscribe({
      next: (res: any) => {
        const inventoryData = res.data;

        // 🔹 Now delete it
        this.inventoryService.deleteInventory(id).subscribe({
          next: (deleteRes: any) => {
            this.deletedInventory = inventoryData;
            this.message = `Inventory ID ${id} deleted successfully`;
            this.deleteForm.reset();
            this.cdr.detectChanges();
          },
          error: (err: HttpErrorResponse) => {
            console.error('Delete Error:', err);
            this.message = '';
            this.error = this.extractErrorMessage(err, id);
            this.cdr.detectChanges();
          },
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Fetch Error:', err);
        this.error = `Could not fetch inventory #${id} for deletion`;
        this.cdr.detectChanges();
      },
    });
  }

  // Returns to the previous screen or parent module page.
  goBack() {
    this.router.navigate(['/modules/inventory']);
  }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any, id?: any): string {
    let message = err?.error?.msg || err?.error?.data || err?.message || 'An error occurred while processing the request.';
    return message;
  }
}
