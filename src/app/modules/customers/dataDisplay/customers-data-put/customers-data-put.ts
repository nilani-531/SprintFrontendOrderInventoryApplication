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
    fullName: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl(''),
    address: new FormControl(''),
  });

  error: any = null;
  success: any = null;
  isLoading: boolean = false;
  customerDetails: any = null;

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
          emailAddress: this.customerDetails.emailAddress,
          phoneNumber: this.customerDetails.phoneNumber,
          address: this.customerDetails.address,
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

  goBack() {
    this.router.navigate(['/modules/customers']);
  }

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
