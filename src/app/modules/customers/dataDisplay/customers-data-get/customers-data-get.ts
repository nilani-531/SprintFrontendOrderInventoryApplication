import { CustomersService } from './../../customers-service';
import { ChangeDetectorRef, Component, inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-customers-data-get',
  imports: [],
  templateUrl: './customers-data-get.html',
  styleUrl: './customers-data-get.css',
})
export class CustomersDataGet {
  customersService:CustomersService=inject(CustomersService)
  change:ChangeDetectorRef=inject(ChangeDetectorRef)

  customers: any[]=[];

  getAllCustomers(){
    this.customersService.getAllCustomers().subscribe({
     next:(data:any)=>{
      this.customers=data.data? data.data:data;
     },
     error:(err)=> {
       console.error(err);
     }
    })
  }
 customerId:number=0;
 customer:any;
  getCustomerById(){
         this.customersService.getCustomerById(this.customerId).subscribe({
          next:(data:any)=>{
            this.customers=data.data;
          },
        error:(err)=>{
          console.error(err);
        }
          
         })
  }

}
