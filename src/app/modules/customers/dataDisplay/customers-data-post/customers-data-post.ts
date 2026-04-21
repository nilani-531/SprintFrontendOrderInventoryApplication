import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomersService } from '../../customers-service';

@Component({
  selector: 'app-customers-data-post',
  imports: [ReactiveFormsModule],
  templateUrl: './customers-data-post.html',
  styleUrl: './customers-data-post.css',
})
export class CustomersDataPost {
    customersService:CustomersService=inject(CustomersService);
  customerForm=new FormGroup({
    fullName:new FormControl("",[Validators.required]),
    emailAddress:new FormControl("",[Validators.required,Validators.email]),
    phoneNumber:new FormControl(""),
    address:new FormControl("")
  })
  error:any = null;
  handleSubmit(){
    console.log(this.customerForm.value);

      if(this.customerForm.valid){

        this.customersService.createCustomer(this.customerForm.value).subscribe({
          next:(data:any)=>{
            alert("Customer created successfully");
            this.customerForm.reset();
          },
          error:(err)=>{
            console.error(err);
            this.error=err.error?.message || "An error occurred while creating the customer.";
          }
        })
    }
}
}
