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

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.deleteForm = this.fb.group({
      inventoryId: ['', [Validators.required, Validators.min(1)]],
    });
  }

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

            if (err.status === 404) {
              this.error = err.error?.msg || `Inventory ID ${id} not found`;
            } else if (err.status === 400) {
              this.error = err.error?.msg || 'Invalid Request';
            } else if (err.status === 0) {
              this.error = 'Server is offline or unreachable';
            } else {
              this.error = 'An unexpected error occurred';
            }
            this.cdr.detectChanges();
          },
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Fetch Error:', err);
        this.error = 'Could not fetch inventory for deletion';
        this.cdr.detectChanges();
      },
    });
  }

  goBack() {
    this.router.navigate(['/modules/inventory']);
  }

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
