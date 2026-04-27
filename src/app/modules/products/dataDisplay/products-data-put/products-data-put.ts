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

  constructor(
    private http: HttpClient,
    private productService: ProductsDataService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

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

  ngOnInit(): void {

    // Initialize form
    this.productForm = new FormGroup({
      productId: new FormControl('', [Validators.required]),
      productName: new FormControl('', [Validators.required]),
      unitPrice: new FormControl('', [Validators.required]),
      brand: new FormControl(''),
      colour: new FormControl(''),
      size: new FormControl(''),
      rating: new FormControl('')
    });
  }

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

  // 🔹 Cancel button
  goBack(): void {
    this.router.navigate(['/modules/products']);
  }

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
