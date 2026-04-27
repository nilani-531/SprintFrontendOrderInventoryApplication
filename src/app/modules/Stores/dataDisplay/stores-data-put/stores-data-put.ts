import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { StoresService } from '../../stores-service';

// At least one of webAddress or physicalAddress must be provided
const addressValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const web = (group.get('webAddress')?.value || '').trim();
  const physical = (group.get('physicalAddress')?.value || '').trim();
  return web || physical ? null : { addressRequired: true };
};

@Component({
  selector: 'app-stores-data-put',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stores-data-put.html',
  styleUrl: './stores-data-put.css',
})
export class StoresDataPut implements OnInit {
  storeForm!: FormGroup;
  error = '';
  success = '';
  isLoading = false;
  storeDetails: any = null;

  constructor(
    private storesService: StoresService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.storeForm = new FormGroup({
      storeId: new FormControl('', [Validators.required]),
      storeName: new FormControl('', [Validators.required]),
      webAddress: new FormControl('', [Validators.pattern(/^(https?:\/\/)/)]),
      physicalAddress: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      logo: new FormControl(''),
      logoMimeType: new FormControl(''),
      logoFilename: new FormControl(''),
      logoCharset: new FormControl(''),
      logoLastUpdated: new FormControl(''),
    }, { validators: addressValidator });
  }

  fetchStoreById(): void {
    const id = this.storeForm.get('storeId')?.value;
    if (!id) {
      this.error = 'Enter a valid Store ID';
      return;
    }
    this.isLoading = true;
    this.error = '';
    this.success = '';

    this.storesService.getStoreById(id).subscribe({
      next: (res: any) => {
        this.storeDetails = res.data;
        this.storeForm.patchValue({
          storeName: res.data.storeName,
          webAddress: res.data.webAddress || '',
          physicalAddress: res.data.physicalAddress || '',
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          logo: res.data.logo,
          logoMimeType: res.data.logoMimeType,
          logoFilename: res.data.logoFilename,
          logoCharset: res.data.logoCharset,
          logoLastUpdated: res.data.logoLastUpdated,
        });
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.storeDetails = null;
        this.error = err.error?.msg || 'Store not found';
        this.cdr.detectChanges();
      },
    });
  }

  handleUpdate(): void {
    this.error = '';
    this.success = '';
    this.storeForm.markAllAsTouched();

    if (!this.storeDetails) {
      this.error = 'Please search and load a store first';
      return;
    }

    if (this.storeForm.invalid) {
      if (this.storeForm.get('storeName')?.hasError('required')) {
        this.error = 'Store name is required';
      } else if (this.storeForm.hasError('addressRequired')) {
        this.error = 'Either web address or physical address is required';
      } else if (this.storeForm.get('webAddress')?.hasError('pattern')) {
        this.error = 'Web address must start with http:// or https://';
      } else {
        this.error = 'Please correct the form errors';
      }
      this.cdr.detectChanges();
      return;
    }

    const storeId = this.storeForm.get('storeId')?.value;
    const payload = {
      storeName: this.storeForm.get('storeName')?.value,
      webAddress: this.storeForm.get('webAddress')?.value || null,
      physicalAddress: this.storeForm.get('physicalAddress')?.value || null,
      latitude: this.storeForm.get('latitude')?.value,
      longitude: this.storeForm.get('longitude')?.value,
      logo: this.storeForm.get('logo')?.value || null,
      logoMimeType: this.storeForm.get('logoMimeType')?.value || null,
      logoFilename: this.storeForm.get('logoFilename')?.value || null,
      logoCharset: this.storeForm.get('logoCharset')?.value || null,
      logoLastUpdated: this.storeForm.get('logoLastUpdated')?.value || null,
    };

    this.storesService.updateStore(storeId, payload).subscribe({
      next: (res: any) => {
        this.success = `${res.msg || 'Store updated successfully'} (ID: ${storeId})`;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error?.msg || 'Update failed';
        this.cdr.detectChanges();
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/modules/stores']);
  }
}
