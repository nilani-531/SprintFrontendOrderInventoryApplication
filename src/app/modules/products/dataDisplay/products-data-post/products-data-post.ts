// This component creates new product records from user input.
// It sends form data to the backend for the add operation.

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsDataService } from '../products-data.service';

@Component({
  selector: 'app-products-data-post',
  imports: [ReactiveFormsModule],
  templateUrl: './products-data-post.html',
  styleUrl: './products-data-post.css',
})
export class ProductsDataPost {
  productsService: ProductsDataService = inject(ProductsDataService);
  router = inject(Router);

  productsForm = new FormGroup({
    productName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]),
    unitPrice: new FormControl('', [
      Validators.required,
      Validators.min(0.01),
      Validators.max(999999)
    ]),
    colour: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    brand: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    size: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]),
    rating: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(5)
    ])
  });

  error: any = null;
  successMessage: string = '';

  // Handles submit and updates the related state safely.
  handleSubmit() {
    if (this.productsForm.valid) {
      const payload = this.productsForm.value;

      this.productsService.createProduct(payload).subscribe({
        next: (data: any) => {
          this.successMessage = `Product created successfully! (ID: ${data.data?.productId || ''})`;
          this.productsForm.reset();
          this.error = null;
        },
        error: (err) => {
          if (err.error && err.error.msg) {
            this.error = err.error.msg;
          } else if (err.status === 0) {
            this.error = 'Cannot connect to server';
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
  goBack() { this.router.navigate(['/modules/products']); }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any): string {
    return err?.error?.msg || err?.error?.data || err?.message || 'An error occurred while processing the request.';
  }
}
