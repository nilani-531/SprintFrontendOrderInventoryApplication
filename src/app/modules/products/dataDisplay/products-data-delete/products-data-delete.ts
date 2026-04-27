import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsDataService } from '../products-data.service';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-products-data-delete',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './products-data-delete.html',
  styleUrl: './products-data-delete.css',
})
export class ProductsDataDelete {
  deleteForm: FormGroup;
  message: string = '';
  error: string = '';
  deletedProduct: any = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsDataService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.deleteForm = this.fb.group({
      productId: ['', [Validators.required, Validators.min(1)]],
    });
  }

  deleteById() {
    this.message = '';
    this.error = '';
    this.deletedProduct = null;

    if (this.deleteForm.invalid) {
      this.error = 'Please enter a valid Product ID';
      return;
    }

    const id = this.deleteForm.value.productId;

    // 🔹 First fetch the product to display it after deletion
    this.productService.getProduct(id).subscribe({
      next: (res: any) => {
        const productData = res.data;

        // 🔹 Now delete it
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            this.deletedProduct = productData;
            this.message = `Product ID ${id} deleted successfully`;
            this.deleteForm.reset();
            this.cdr.detectChanges();
          },

          error: (err: HttpErrorResponse) => {
            console.error('Delete Error:', err);

            if (err.status === 404) {
              this.error = `Product ID ${id} not found`;
            } else if (err.status === 401) {
              this.error = 'Unauthorized access';
            } else if (err.status === 0) {
              this.error = 'Server offline';
            } else {
              this.error = 'Unexpected error occurred';
            }
            this.cdr.detectChanges();
          },
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Fetch Error:', err);
        this.error = 'Could not fetch product for deletion';
        this.cdr.detectChanges();
      },
    });
  }

  goBack() {
    this.router.navigate(['/modules/products']);
  }

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
