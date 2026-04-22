import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { ProductsDataService } from '../products-data.service';

@Component({
  selector: 'app-products-data-put',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './products-data-put.html',
  styleUrl: './products-data-put.css',
})
export class ProductsDataPut implements OnInit  {

  productForm!: FormGroup;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast: boolean = false;

  constructor(
    private http: HttpClient,
    private productService: ProductsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
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

    // Get ID from route
    const id = this.route.snapshot.params['id'];
    this.productForm.get('productId')?.setValue(id);

    // Load existing product
    this.loadProduct();
  }

  // 🔹 Load product by ID
  loadProduct(): void {
    const id = this.productForm.get('productId')?.value;
    if (!id) return;

    this.productService.getProduct(id)
      .subscribe({
        next: (res) => {
          this.productForm.patchValue(res.data);
          this.productForm.get('productId')?.setValue(id); // Ensure ID stays
        },
        error: (err) => {
          console.error('Error loading product', err);
          this.showNotification('Failed to load product', 'error');
        }
      });
  }

  // 🔹 Update product
  handleUpdate(): void {
    if (this.productForm.invalid) return;

    const id = this.productForm.get('productId')?.value;
    this.productService.updateProduct(id, this.productForm.value).subscribe({
      next: () => {
        this.showNotification('Product updated successfully ✅', 'success');
        setTimeout(() => {
          this.router.navigate(['/modules/products']);
        }, 1000);
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
}