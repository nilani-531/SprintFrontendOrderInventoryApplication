import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-inventory-data-delete',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inventory-data-delete.html',
  styleUrl: './inventory-data-delete.css',
})
export class InventoryDataDelete {
  deleteForm: FormGroup;
  message: string = '';
  error: string = '';

  baseUrl = 'http://localhost:9090/api/inventory';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.deleteForm = this.fb.group({
      inventoryId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  deleteById() {
    this.message = '';
    this.error = '';

    if (this.deleteForm.invalid) {
      this.error = 'Please enter a valid ID';
      return;
    }

    const id = this.deleteForm.value.inventoryId;

    this.http.delete(`${this.baseUrl}/${id}`).subscribe({
      next: (res: any) => {
        this.message = `Inventory ID ${id} deleted successfully`;
        this.deleteForm.reset();
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Delete Error:', err);
        this.message = '';

        if (err.status === 404) {
          this.error = err.error?.msg || `Inventory ID ${id} not found`;
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
