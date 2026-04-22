import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  baseUrl = 'http://localhost:9090/products';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.deleteForm = this.fb.group({
      productId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  deleteById() {
    this.message = '';
    this.error = '';

    if (this.deleteForm.invalid) {
      this.error = 'Please enter a valid ID';
      return;
    }

    const id = this.deleteForm.value.productId;

    this.http.delete(`${this.baseUrl}/${id}`).subscribe({
      next: (res: any) => {
        this.message = `Product ID ${id} deleted successfully`;
        this.deleteForm.reset();
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Delete Error:', err);
        this.message = '';

        if (err.status === 404) {
          this.error = err.error?.msg || `Product ID ${id} not found`;
        } else if (err.status === 400) {
          this.error = err.error?.msg || 'Invalid Request';
        } else if (err.status === 0) {
          this.error = 'Server is offline or unreachable';
        } else {
          this.error = 'An unexpected error occurred';
        }
        this.cdr.detectChanges();
      }
    });
  }
}
