import { Component, ChangeDetectorRef } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../orders-service';
import { OrderGetNavbar } from '../order-get-navbar/order-get-navbar';

interface Order {
  orderId: number;
  customerId: number | string;
  storeId: number | string;
  orderStatusS: string;
  orderTms: string;
}

@Component({
  selector: 'app-orders-data-get',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, OrderGetNavbar],
  templateUrl: './orders-data-get.html',
  styleUrl: './orders-data-get.css',
})
export class OrdersDataGet {
  form: FormGroup;
  selectedOption = '';
  orderId!: number;
  customerId!: number;
  storeId!: number;
  status = '';
  fromDate = '';
  toDate = '';

  singleOrder: Order | null = null;
  allOrders: Order[] = [];
  paginatedOrders: Order[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  loading = false;
  error = '';

  constructor(
    private ordersService: OrdersService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      orderId: ['', [Validators.min(1)]],
      customerId: ['', [Validators.min(1)]],
      storeId: ['', [Validators.min(1)]],
      status: [''],
      fromDate: [''],
      toDate: [''],
    });
  }

  ngOnInit() {
    this.route.url.subscribe((segments) => {
      if (segments.length > 0) {
        const path = segments[segments.length - 1].path;
        if (path === 'get-all') this.selectedOption = 'getAll';
        else if (path === 'get-by-id') this.selectedOption = 'getById';
        else if (path === 'get-by-customer') this.selectedOption = 'getByCustomer';
        else if (path === 'get-by-store') this.selectedOption = 'getByStore';
        else if (path === 'get-by-status') this.selectedOption = 'getByStatus';
        else if (path === 'get-by-date-range') this.selectedOption = 'getByDateRange';
      }
    });
  }

  onOptionSelected(option: string) {
    this.selectedOption = option;
    this.resetData();
  }

  isInputValid(): boolean {
    if (this.selectedOption === 'getAll') return true;
    if (this.selectedOption === 'getById') return !!this.orderId && this.orderId > 0;
    if (this.selectedOption === 'getByCustomer') return !!this.customerId && this.customerId > 0;
    if (this.selectedOption === 'getByStore') return !!this.storeId && this.storeId > 0;
    if (this.selectedOption === 'getByStatus')
      return !!this.status && this.status.trim().length > 0;
    if (this.selectedOption === 'getByDateRange') return !!this.fromDate && !!this.toDate;
    return false;
  }

  fetchData() {
    if (!this.isInputValid()) {
      this.error = 'Please provide valid input';
      return;
    }
    if (this.selectedOption === 'getAll') {
      this.getAllOrders();
    } else if (this.selectedOption === 'getById') {
      this.form.patchValue({ orderId: this.orderId });
      this.getOrderById();
    } else if (this.selectedOption === 'getByCustomer') {
      this.getOrdersByCustomer();
    } else if (this.selectedOption === 'getByStore') {
      this.getOrdersByStore();
    } else if (this.selectedOption === 'getByStatus') {
      this.getOrdersByStatus();
    } else if (this.selectedOption === 'getByDateRange') {
      this.getOrdersByDateRange();
    }
  }

  getOrderById() {
    const id = this.form.value.orderId;
    this.resetData();
    this.loading = true;

    this.ordersService.getOrderById(id).subscribe({
      next: (res: any) => {
        const data = res.data;
        if (!data) {
          this.error = 'No data found.';
        } else {
          data.customerId = data.customerId === 0 ? 'N/A' : data.customerId;
          data.storeId = data.storeId === 0 ? 'N/A' : data.storeId;
          this.singleOrder = data;
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

  getAllOrders() {
    this.resetData();
    this.loading = true;

    this.ordersService.getAllOrders().subscribe({
      next: (res: any) => {
        const dataList = res.data || [];
        if (dataList.length === 0) {
          this.error = 'No data found.';
        } else {
          this.allOrders = dataList.map((o: any) => ({
            ...o,
            customerId: o.customerId === 0 ? 'N/A' : o.customerId,
            storeId: o.storeId === 0 ? 'N/A' : o.storeId,
          }));
          this.currentPage = 1;
          this.updatePaginatedOrders();
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

  getOrdersByCustomer() {
    this.resetData();
    this.loading = true;
    this.ordersService.getOrdersByCustomer(this.customerId).subscribe({
      next: (res: any) => {
        const dataList = res.data || [];
        if (dataList.length === 0) {
          this.error = 'No data found.';
        } else {
          this.allOrders = dataList.map((o: any) => ({
            ...o,
            customerId: o.customerId === 0 ? 'N/A' : o.customerId,
            storeId: o.storeId === 0 ? 'N/A' : o.storeId,
          }));
          this.currentPage = 1;
          this.updatePaginatedOrders();
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

  getOrdersByStore() {
    this.resetData();
    this.loading = true;
    this.ordersService.getOrdersByStore(this.storeId).subscribe({
      next: (res: any) => {
        const dataList = res.data || [];
        if (dataList.length === 0) {
          this.error = 'No data found.';
        } else {
          this.allOrders = dataList.map((o: any) => ({
            ...o,
            customerId: o.customerId === 0 ? 'N/A' : o.customerId,
            storeId: o.storeId === 0 ? 'N/A' : o.storeId,
          }));
          this.currentPage = 1;
          this.updatePaginatedOrders();
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

  getOrdersByStatus() {
    this.resetData();
    this.loading = true;
    this.ordersService.getOrdersByStatus(this.status).subscribe({
      next: (res: any) => {
        const dataList = res.data || [];
        if (dataList.length === 0) {
          this.error = 'No data found.';
        } else {
          this.allOrders = dataList.map((o: any) => ({
            ...o,
            customerId: o.customerId === 0 ? 'N/A' : o.customerId,
            storeId: o.storeId === 0 ? 'N/A' : o.storeId,
          }));
          this.currentPage = 1;
          this.updatePaginatedOrders();
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

  getOrdersByDateRange() {
    this.resetData();
    this.loading = true;
    // appending T00:00:00 to match backend LocalDateTime if the user inputs just YYYY-MM-DD
    const from = this.fromDate.includes('T') ? this.fromDate : this.fromDate + 'T00:00:00';
    const to = this.toDate.includes('T') ? this.toDate : this.toDate + 'T23:59:59';
    this.ordersService.getOrdersByDateRange(from, to).subscribe({
      next: (res: any) => {
        const dataList = res.data || [];
        if (dataList.length === 0) {
          this.error = 'No data found.';
        } else {
          this.allOrders = dataList.map((o: any) => ({
            ...o,
            customerId: o.customerId === 0 ? 'N/A' : o.customerId,
            storeId: o.storeId === 0 ? 'N/A' : o.storeId,
          }));
          this.currentPage = 1;
          this.updatePaginatedOrders();
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

  updatePaginatedOrders() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedOrders = this.allOrders.slice(start, start + this.itemsPerPage);
  }

  getTotalPages(): number {
    return Math.ceil(this.allOrders.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePaginatedOrders();
    }
  }

  private extractErrorMessage(err: any): string {
    return err?.error?.msg || err?.error?.data || err?.message || 'Orders not found.';
  }

  resetData() {
    this.error = '';
    this.singleOrder = null;
    this.allOrders = [];
    this.paginatedOrders = [];
    this.currentPage = 1;
  }
}
