import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core'; 

@Component({
  selector: 'app-order-items-data-delete',
  imports: [ReactiveFormsModule],
  templateUrl: './order-items-data-delete.html',
  styleUrl: './order-items-data-delete.css',
})
export class OrderItemsDataDelete {
   deleteForm1: FormGroup;
  message: string = '';
  error: string = '';

  baseUrl = 'http://localhost:9090/api/order-items';


  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private cdr: ChangeDetectorRef 
  ) {
    this.deleteForm1 = this.fb.group({
      orderId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  deleteById() {
    this.message = '';
    this.error = '';

    if (this.deleteForm1.invalid) {
      this.error = "Please enter a valid ID";
      return;
    }

    const id = this.deleteForm1.value.orderId;

    this.http.delete(`${this.baseUrl}/${id}`).subscribe({
      next: (res: any) => {
        this.message = `ID ${id} is deleted successfully`;
        this.deleteForm1.reset();
        this.cdr.detectChanges(); 
      },
      error: (err: HttpErrorResponse) => {
        console.error("Delete Error:", err);
        this.message = ''; 

        if (err.status === 404) {
          this.error = err.error?.msg || `ID ${id} not found`;
        } 
        else if (err.status === 400) {
           this.error = err.error?.msg || "Invalid Request";
        }
        else if (err.status === 0) {
          this.error = "Server is offline or unreachable";
        } 
        else {
          this.error = "An unexpected error occurred";
        }
        this.cdr.detectChanges(); 
      }
    });
  }
}
