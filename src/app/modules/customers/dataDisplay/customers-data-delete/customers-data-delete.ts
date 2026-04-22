import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CustomersService } from '../../customers-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers-data-delete',
  imports: [ReactiveFormsModule],
  templateUrl: './customers-data-delete.html',
  styleUrl: './customers-data-delete.css',
})
export class CustomersDataDelete {
   customersService: CustomersService = inject(CustomersService);
  change: ChangeDetectorRef = inject(ChangeDetectorRef);

  deleteForm = new FormGroup({
    customerId: new FormControl("", [Validators.required])
  });

  error: any = null;
  success: any = null;

  handleDelete() {
    console.log(this.deleteForm.value);

    // ✅ reset like update
    this.error = null;
    this.success = null;

    const custid = Number(this.deleteForm.value.customerId);

    if (this.deleteForm.valid) {

      this.customersService.deleteCustomer(custid).subscribe({
        next: (data: any) => {
          this.success = data.msg + " with ID: " + custid;
          this.error = null;
          this.deleteForm.reset();
          this.change.detectChanges();
        },
        error: (err) => {
          console.error(err);

          this.success = null; 

          if (err.error && err.error.msg) {
             console.error(err);
             if (err.error && err.error.msg) {
            this.error = err.error.msg;  
           } else if (err.status === 0) {
            this.error = "Cannot connect to server";
           } else {
             this.error = "Something went wrong";
        }}

          this.change.detectChanges();
          this.deleteForm.reset();
        }
      });
    }
  }
}
