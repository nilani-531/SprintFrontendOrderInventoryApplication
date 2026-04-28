// This component updates existing product records.
// It is used when the user wants to replace saved data with new values.

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, CommonModule } from '@angular/common';
import { ProductsDataService } from '../products-data.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-products-data-put',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './products-data-put.html',
  styleUrl: './products-data-put.css',
})
export class ProductsDataPut implements OnInit  {

  productForm!: FormGroup;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast: boolean = false;
  loading: boolean = false;
  productDetails: any = null;

  // Initializes this component and prepares the dependencies used in the file.
  constructor(
    private http: HttpClient,
    private productService: ProductsDataService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // Displays a toast message for the latest success or error response.
  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  // Runs when the component loads and prepares the initial data and screen state.
  ngOnInit(): void {

    // Initialize form
    this.productForm = new FormGroup({
      productId: new FormControl('', [Validators.required]),
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
      brand: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      colour: new FormControl('', [
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
  }

  // Searches the available product records using the current input value.
  // 🔍 SEARCH PRODUCT
  searchProduct(): void {
    const id = this.productForm.get('productId')?.value;

    if (!id) {
      this.showNotification('Enter valid Product ID', 'error');
      return;
    }

    this.loading = true;

    this.productService.getProduct(id).subscribe({
      next: (res: any) => {
        this.productDetails = res.data;

        this.productForm.patchValue({
          productName: res.data.productName,
          unitPrice: res.data.unitPrice,
          brand: res.data.brand,
          colour: res.data.colour,
          size: res.data.size,
          rating: res.data.rating
        });

        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification('Product loaded successfully', 'info');
      },

      error: (err) => {
        console.error(err);
        this.productDetails = null;
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification('Product not found ❌', 'error');
      }
    });
  }

  // Handles update and updates the related state safely.
  // 🔹 Update product
  handleUpdate(): void {
    if (this.productForm.invalid) return;

    const id = this.productForm.get('productId')?.value;
    this.productService.updateProduct(id, this.productForm.value).subscribe({
      next: () => {
        this.showNotification(`Product updated successfully ✅ (ID: ${id})`, 'success');
      },
      error: (err) => {
        console.error('Update failed', err);
        this.showNotification('Update failed', 'error');
      }
    });
  }

  // Returns to the previous screen or parent module page.
  // 🔹 Cancel button
  goBack(): void {
    this.router.navigate(['/modules/products']);
  }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any): string {
    return err?.error?.msg || err?.error?.data || err?.message || 'An error occurred while processing the request.';
  }
}
