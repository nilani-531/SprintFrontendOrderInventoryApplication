// This component updates existing customer records.
// It is used when the user wants to replace saved data with new values.

import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from '../../customers-service';

@Component({
  selector: 'app-customers-data-put',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customers-data-put.html',
  styleUrl: './customers-data-put.css',
})
export class CustomersDataPut {
  customersService: CustomersService = inject(CustomersService);
  change: ChangeDetectorRef = inject(ChangeDetectorRef);
  router = inject(Router);

  updateForm = new FormGroup({
    customerId: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]),
    emailAddress: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100)
    ])
  });

  error: any = null;
  success: any = null;
  isLoading: boolean = false;
  customerDetails: any = null;

  // Handles fetch customer by id for the current component without changing the workflow.
  fetchCustomerById(): void {
    const id = this.updateForm.get('customerId')?.value;
    if (!id) {
      this.error = 'Enter a valid Customer ID';
      return;
    }
    this.isLoading = true;
    this.error = '';
    this.success = '';

    this.customersService.getCustomerById(Number(id)).subscribe({
      next: (res: any) => {
        this.customerDetails = res.data ? res.data : res;
        this.updateForm.patchValue({
          fullName: this.customerDetails.fullName,
          emailAddress: this.customerDetails.emailAddress
        });
        this.isLoading = false;
        this.change.detectChanges();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.customerDetails = null;
        this.error = err.error?.msg || 'Customer not found';
        this.change.detectChanges();
      },
    });
  }

  // Handles submit and updates the related state safely.
  handleSubmit() {
    this.error = null;
    this.success = null;
    const id = Number(this.updateForm.value.customerId);
    if (this.updateForm.valid && this.customerDetails) {
      this.customersService.updateCustomer(id, this.updateForm.value).subscribe({
        next: (data: any) => {
          this.success = data.msg + ' with ID: ' + data.data.customerId;
          this.error = null;
          this.updateForm.reset();
          this.change.detectChanges();
        },
        error: (err) => {
          if (err.error && err.error.msg) {
            this.error = err.error.msg;
          } else this.error = this.extractErrorMessage(err);
          this.success = null;
          this.change.detectChanges();
        },
      });
    } else {
      this.error = 'Please fetch valid customer first and fill all required fields';
    }
  }

  // Returns to the previous screen or parent module page.
  goBack() {
    this.router.navigate(['/modules/customers']);
  }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any): string {
    return err?.error?.msg || err?.error?.data || err?.message || 'An error occurred while processing the request.';
  }
}
