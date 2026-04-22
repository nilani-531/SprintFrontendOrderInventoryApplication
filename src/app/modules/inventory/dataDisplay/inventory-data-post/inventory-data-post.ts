import { Component, inject } from '@angular/core';
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

  inventoryForm = new FormGroup({
    storeId: new FormControl('', [Validators.required, Validators.min(1)]),
    productId: new FormControl('', [Validators.required, Validators.min(1)]),
    productInventory: new FormControl('', [Validators.required, Validators.min(0)])
  });

  error: any = null;
  successMessage: string = '';

  handleSubmit() {
    if (this.inventoryForm.valid) {
      const formValue = this.inventoryForm.value;
      const storeId = Number(formValue.storeId);
      const productId = Number(formValue.productId);
      const payload = { productInventory: Number(formValue.productInventory) };

      this.inventoryService.createInventory(storeId, productId, payload).subscribe({
        next: (data: any) => {
          this.successMessage = 'Inventory created successfully';
          alert('Inventory created successfully');
          this.inventoryForm.reset();
          this.error = null;
          this.successMessage = '';
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
}
