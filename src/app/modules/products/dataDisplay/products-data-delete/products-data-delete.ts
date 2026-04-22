import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsDataService } from '../products-data.service';

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

  constructor(
    private fb: FormBuilder,
    private productService: ProductsDataService
  ) {
    this.deleteForm = this.fb.group({
      productId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  deleteById() {

    this.message = '';
    this.error = '';

    if (this.deleteForm.invalid) {
      this.error = 'Please enter a valid Product ID';
      return;
    }

    const id = this.deleteForm.value.productId;

    this.productService.deleteProduct(id).subscribe({

      next: () => {
        this.message = `Product ID ${id} deleted successfully`;
        this.deleteForm.reset();
      },

      error: (err: HttpErrorResponse) => {
        console.error('Delete Error:', err);

        if (err.status === 404) {
          this.error = `Product ID ${id} not found`;
        }
        else if (err.status === 401) {
          this.error = 'Unauthorized access';
        }
        else if (err.status === 0) {
          this.error = 'Server offline';
        }
        else {
          this.error = 'Unexpected error occurred';
        }
      }

    });
  }
}