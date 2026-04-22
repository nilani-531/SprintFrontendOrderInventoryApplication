import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersService } from './../../customers-service';


@Component({
  selector: 'app-customers-data-get',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customers-data-get.html',
  styleUrl: './customers-data-get.css',
})
export class CustomersDataGet {
customersService = inject(CustomersService);
change = inject(ChangeDetectorRef);

  customers: any[] = [];
  customer: any = null;
  orders: any[] = [];
  shipments: any[] = [];

  customerId!: number;
  emailAddress!: string;

  errorMessage: string = '';

  //  Get All Customers
  getAllCustomers() {
    
    this.reset();

    this.customersService.getAllCustomers().subscribe({
      next: (data: any) => {
        this.customers = data.data ? data.data : data;
        this.change.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  // ✅ Get By ID
  getCustomerById() {
    if (!this.customerId || this.customerId <= 0) {
      alert("Enter valid ID");
      return;
    }

    this.reset();

    this.customersService.getCustomerById(this.customerId).subscribe({
      next: (data: any) => {
        this.customer = data.data ? data.data : data;
        this.change.detectChanges();
      },
      error: (err) => this.handleError(err)
    });
  }

  // ✅ Get By Email
  getCustomerByEmail() {
    if (!this.emailAddress) {
      alert("Enter email");
      return;
    }

    this.reset();

    this.customersService.getCustomerByEmail(this.emailAddress).subscribe({
      next: (data: any) => {
        this.customer = data.data ? data.data : data;
        this.change.detectChanges();
      },
      error: (err) => this.handleError(err)
    });
  }

  // ✅ Get Orders
  getOrders() {
    if (!this.customerId || this.customerId <= 0) {
    alert("Enter valid Customer ID first");
    return;
  }
    this.resetListsOnly();

    this.customersService.getCustomerOrders(this.customerId).subscribe({
      next: (data: any) => {
        this.orders = data.data ? data.data : data;
        this.change.detectChanges();
      },
      error: (err) => this.handleError(err)
      
    });
  }

  // ✅ Get Shipments
  getShipments() {
    if (!this.customerId || this.customerId <= 0) {
    alert("Enter valid Customer ID first");
    return;
  }
    this.resetListsOnly();

    this.customersService.getCustomerShipments(this.customerId).subscribe({
      next: (data: any) => {
        this.shipments = data.data ? data.data : data;
        this.change.detectChanges();
      },
      error: (err) => this.handleError(err)
    });
  }

  // 🔥 Common Reset
  reset() {
    this.customers = [];
    this.customer = null;
    this.orders = [];
    this.shipments = [];
    this.errorMessage = '';
  }

  // 🔥 Error Handler
  handleError(err: any) {
    console.log("Status:", err.status);

    if (err.status === 404) {
      this.errorMessage = "Resource not found";
    } else if (err.status === 500) {
      this.errorMessage = "Server error";
    } else {
      this.errorMessage = "Something went wrong";
    }
  }

resetListsOnly() {
  this.orders = [];
  this.shipments = [];
  this.errorMessage = '';
}

}


