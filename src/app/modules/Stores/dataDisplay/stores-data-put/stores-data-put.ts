import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stores-data-put',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stores-data-put.html',
  styleUrl: './stores-data-put.css',
})
export class StoresDataPut implements OnInit  {



  productForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

    this.http.get<any>(`http://localhost:9090/products/${id}`)
      .subscribe({
        next: (res) => {
          this.productForm.patchValue(res.data);
          this.productForm.get('productId')?.setValue(id); // Ensure ID stays
        },
        error: (err) => {
          console.error('Error loading product', err);
          alert('Failed to load product');
        }
      });
  }

  // 🔹 Update product
  handleUpdate(): void {
    if (this.productForm.invalid) return;

    const id = this.productForm.get('productId')?.value;
    this.http.put(
      `http://localhost:9090/products/${id}`,
      this.productForm.value
    ).subscribe({
      next: () => {
        alert('Product updated successfully ✅');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Update failed', err);
        alert('Update failed');
      }
    });
  }

  // 🔹 Cancel button
  goBack(): void {
    this.router.navigate(['/products']);
  }
}