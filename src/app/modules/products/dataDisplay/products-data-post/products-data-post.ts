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
    productName: new FormControl('', [Validators.required]),
    unitPrice: new FormControl('', [Validators.required, Validators.min(0)]),
    colour: new FormControl(''),
    brand: new FormControl(''),
    size: new FormControl(''),
    rating: new FormControl('', [Validators.min(0), Validators.max(5)])
  });

  error: any = null;
  successMessage: string = '';

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

  goBack() { this.router.navigate(['/modules/products']); }

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
