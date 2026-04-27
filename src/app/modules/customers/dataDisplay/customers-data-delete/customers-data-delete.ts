import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from '../../customers-service';

@Component({
  selector: 'app-customers-data-delete',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customers-data-delete.html',
  styleUrl: './customers-data-delete.css',
})
export class CustomersDataDelete {
  customersService: CustomersService = inject(CustomersService);
  change: ChangeDetectorRef = inject(ChangeDetectorRef);
  router = inject(Router);

  deleteForm = new FormGroup({
    customerId: new FormControl('', [Validators.required])
  });

  error: any = null;
  success: any = null;
  deletedCustomer: any = null;

  handleDelete() {
    this.error = null;
    this.success = null;
    this.deletedCustomer = null;
    const custid = Number(this.deleteForm.value.customerId);
    if (this.deleteForm.valid) {
      this.customersService.getCustomerById(custid).subscribe({
        next: (res: any) => {
          const customerData = res.data || res;
          this.customersService.deleteCustomer(custid).subscribe({
            next: (data: any) => {
              this.deletedCustomer = customerData;
              this.success = data.msg + ' with ID: ' + custid;
              this.error = null;
              this.deleteForm.reset();
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
        },
        error: (err) => {
          if (err.error && err.error.msg) {
            this.error = err.error.msg;
          } else {
            this.error = 'Could not fetch customer for deletion';
          }
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
