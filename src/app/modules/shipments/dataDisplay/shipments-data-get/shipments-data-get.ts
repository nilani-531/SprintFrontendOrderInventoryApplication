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

  singleShipment: Shipment | null = null;
  allShipments: Shipment[] = [];
  paginatedShipments: Shipment[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  loading = false;
  error = '';

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

  onOptionSelected(option: string) {
    this.selectedOption = option;
    this.resetData();
  }

  isInputValid(): boolean {
    if (this.selectedOption === 'getAll') return true;
    if (this.selectedOption === 'getById') return !!this.shipmentId && this.shipmentId > 0;
    if (this.selectedOption === 'getByCustomerId') return !!this.customerId && this.customerId > 0;
    if (this.selectedOption === 'getByStoreId') return !!this.storeId && this.storeId > 0;
    if (this.selectedOption === 'getByStatus')
      return !!this.statusValue && this.statusValue.trim().length > 0;
    return false;
  }

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

  getAllShipments() {
    this.resetData();
    this.loading = true;
    this.shipmentsService.getAllShipments().subscribe({
      next: (res: any) => {
        this.allShipments = res.data;
        this.currentPage = 1;
        this.updatePaginated();
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

  getByCustomerId() {
    this.resetData();
    this.loading = true;
    this.shipmentsService.getShipmentsByCustomer(this.customerId).subscribe({
      next: (res: any) => {
        this.allShipments = res.data;
        this.currentPage = 1;
        this.updatePaginated();
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

  getByStoreId() {
    this.resetData();
    this.loading = true;
    this.shipmentsService.getShipmentsByStore(this.storeId).subscribe({
      next: (res: any) => {
        this.allShipments = res.data;
        this.currentPage = 1;
        this.updatePaginated();
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

  getByStatus() {
    this.resetData();
    this.loading = true;
    this.shipmentsService.getShipmentsByStatus(this.statusValue).subscribe({
      next: (res: any) => {
        this.allShipments = res.data;
        this.currentPage = 1;
        this.updatePaginated();
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

  updatePaginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedShipments = this.allShipments.slice(start, start + this.itemsPerPage);
  }

  getTotalPages(): number {
    return Math.ceil(this.allShipments.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePaginated();
    }
  }

  private extractErrorMessage(err: any): string {
    return err?.error?.msg || err?.error?.data || err?.message || 'Something went wrong';
  }

  resetData() {
    this.error = '';
    this.singleShipment = null;
    this.allShipments = [];
    this.paginatedShipments = [];
    this.currentPage = 1;
  }
}
