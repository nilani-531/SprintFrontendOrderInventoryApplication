import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CustomersService } from '../../customers-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers-data-put',
  imports: [ReactiveFormsModule],
  templateUrl: './customers-data-put.html',
  styleUrl: './customers-data-put.css',
})
export class CustomersDataPut {
  customersService:CustomersService=inject(CustomersService);
    change:ChangeDetectorRef=inject(ChangeDetectorRef);
  updateForm=new FormGroup({
    customerId:new FormControl("",[Validators.required]),
    fullName:new FormControl("",[Validators.required]),
    emailAddress:new FormControl("",[Validators.required,Validators.email]),
    phoneNumber:new FormControl(""),
    address:new FormControl("")
  })
  error:any = null;
  success:any=null;
 
  handleSubmit(){
    console.log(this.updateForm.value);
      this.error=null;
    this.success=null;
    const id = Number(this.updateForm.value.customerId);
    
      if(this.updateForm.valid){

        this.customersService.updateCustomer(id,this.updateForm.value).subscribe({
          next:(data:any)=>{
           this.success = data.msg + " with ID: " + data.data.customerId;
           this.error = null; 
            this.updateForm.reset();
            this.change.detectChanges();
          },
          error:(err)=>{
            console.error(err);
             if (err.error && err.error.msg) {
            this.error = err.error.msg;  
           } else if (err.status === 0) {
            this.error = "Cannot connect to server";
           } else {
             this.error = "Something went wrong";
        }
         this.change.detectChanges();   
         this.updateForm.reset();
          }
        })
    }
}
}
