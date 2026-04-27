import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from '../../customers-service';

@Component({
  selector: 'app-customers-data-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customers-data-post.html',
  styleUrl: './customers-data-post.css',
})
export class CustomersDataPost {
  customersService: CustomersService = inject(CustomersService);
  change: ChangeDetectorRef = inject(ChangeDetectorRef);
  router = inject(Router);

  customerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl(''),
    address: new FormControl('')
  });

  error: any = null;
  success: any = null;

  handleSubmit() {
    if (this.customerForm.valid) {
      this.customersService.createCustomer(this.customerForm.value).subscribe({
        next: (data: any) => {
          this.success = data.msg + ' with ID: ' + data.data.customerId;
          this.error = null;
          this.customerForm.reset();
          this.change.detectChanges();
        },
        error: (err) => {
          if (err.error && err.error.msg) {
            this.error = err.error.msg;
          } else this.error = this.extractErrorMessage(err);
        this.success = null;
        this.change.detectChanges();
        }
      });
    }
  }

  goBack() { this.router.navigate(['/modules/customers']); }

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
