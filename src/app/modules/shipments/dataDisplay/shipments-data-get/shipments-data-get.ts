// This component fetches and displays shipment records.
// It is used for the read or view operation in this module.

import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ShipmentsService } from '../../shipments-service';

import { FormsModule } from '@angular/forms';
import { ShipmentGetNavbar } from '../shipment-get-navbar/shipment-get-navbar';

interface Shipment {
  shipmentId: number;
  customerId: number;
  storeId: number;
  deliveryAddress: string;
  shipmentStatus?: string;
}

@Component({
  selector: 'app-shipments-data-get',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ShipmentGetNavbar],
  templateUrl: './shipments-data-get.html',
  styleUrl: './shipments-data-get.css',
})
export class ShipmentsDataGet {
  form: FormGroup;
  selectedOption = '';
  shipmentId!: number;
  customerId!: number;
  storeId!: number;
  statusValue = '';

readonly statusOptions = [
  { value: 'CREATED', label: 'CREATED' },
  { value: 'SHIPPED', label: 'SHIPPED' },
  { value: 'IN_TRANSIT', label: 'IN TRANSIT' },
  { value: 'DELIVERED', label: 'DELIVERED' },
];

  singleShipment: Shipment | null = null;
  allShipments: Shipment[] = [];
  paginatedShipments: Shipment[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  loading = false;
  error = '';
  success = '';

  // Initializes this component and prepares the dependencies used in the file.
  constructor(
    private fb: FormBuilder,
    private shipmentsService: ShipmentsService,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      shipmentId: [''],
      customerId: [''],
      storeId: [''],
      status: [''],
    });
  }

  // Stores the selected option and resets the screen for the next request.
  onOptionSelected(option: string) {
    this.selectedOption = option;
    this.resetData();
  }

  // Checks whether the current input values are valid for the selected request.
  isInputValid(): boolean {
    if (this.selectedOption === 'getAll') return true;
    if (this.selectedOption === 'getById') return !!this.shipmentId && this.shipmentId > 0;
    if (this.selectedOption === 'getByCustomerId') return !!this.customerId && this.customerId > 0;
    if (this.selectedOption === 'getByStoreId') return !!this.storeId && this.storeId > 0;
    if (this.selectedOption === 'getByStatus')
      return !!this.statusValue && this.statusValue.trim().length > 0;
    return false;
  }

  // Calls the selected API endpoint and updates the screen with the response.
  fetchData() {
    if (!this.isInputValid()) {
      this.error = 'Please provide valid input';
      return;
    }
    switch (this.selectedOption) {
      case 'getAll':
        this.getAllShipments();
        break;
      case 'getById':
        this.getShipmentById();
        break;
      case 'getByCustomerId':
        this.getByCustomerId();
        break;
      case 'getByStoreId':
        this.getByStoreId();
        break;
      case 'getByStatus':
        this.getByStatus();
        break;
    }
  }

  // Returns the shipment record that matches the provided identifier.
  getShipmentById() {
    this.resetData();
    this.loading = true;
    this.shipmentsService.getShipmentById(this.shipmentId).subscribe({
      next: (res: any) => {
        this.singleShipment = res.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = this.extractErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Returns all available shipment records from the backend service.
  getAllShipments() {
    this.resetData();
    this.loading = true;
    this.shipmentsService.getAllShipments().subscribe({
      next: (res: any) => {
        if (!res.data || res.data.length === 0) {
          this.error = 'No shipments found';
        } else {
          this.allShipments = res.data;
          this.currentPage = 1;
          this.updatePaginated();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = this.extractErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Returns the required shipment data for the current request.
  getByCustomerId() {
    this.resetData();
    this.loading = true;
    this.shipmentsService.getShipmentsByCustomer(this.customerId).subscribe({
      next: (res: any) => {
        if (!res.data || res.data.length === 0) {
          this.error = 'No shipments found for this customer';
        } else {
          this.allShipments = res.data;
          this.currentPage = 1;
          this.updatePaginated();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = this.extractErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Returns the required shipment data for the current request.
  getByStoreId() {
    this.resetData();
    this.loading = true;
    this.shipmentsService.getShipmentsByStore(this.storeId).subscribe({
      next: (res: any) => {
        if (!res.data || res.data.length === 0) {
          this.error = 'No shipments found for this store';
        } else {
          this.allShipments = res.data;
          this.currentPage = 1;
          this.updatePaginated();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = this.extractErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Returns the required shipment data for the current request.
  getByStatus() {
    this.resetData();
    this.loading = true;
    this.shipmentsService.getShipmentsByStatus(this.statusValue).subscribe({
      next: (res: any) => {
        if (!res.data || res.data.length === 0) {
          this.error = 'No shipments found with this status';
        } else {
          this.allShipments = res.data;
          this.currentPage = 1;
          this.updatePaginated();
          this.success = 'Shipments fetched successfully';
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = this.extractErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Sends a request to update the selected shipment record with the provided data.
  updatePaginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedShipments = this.allShipments.slice(start, start + this.itemsPerPage);
  }

  // Returns the required shipment data for the current request.
  getTotalPages(): number {
    return Math.ceil(this.allShipments.length / this.itemsPerPage);
  }

  // Moves to the selected page and refreshes the visible results as needed.
  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePaginated();
    }
  }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any): string {
    return err?.error?.msg || err?.error?.data || err?.message || 'Something went wrong';
  }

  // Handles reset data for the current component without changing the workflow.
  resetData() {
    this.error = '';
    this.singleShipment = null;
    this.allShipments = [];
    this.paginatedShipments = [];
    this.currentPage = 1;
  }
}
