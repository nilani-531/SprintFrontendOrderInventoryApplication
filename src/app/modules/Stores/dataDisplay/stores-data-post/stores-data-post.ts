import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { StoresService } from '../../stores-service';

// At least one of webAddress or physicalAddress must be provided
const addressValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const web = (group.get('webAddress')?.value || '').trim();
  const physical = (group.get('physicalAddress')?.value || '').trim();
  return web || physical ? null : { addressRequired: true };
};

@Component({
  selector: 'app-stores-data-post',
  imports: [ReactiveFormsModule],
  templateUrl: './stores-data-post.html',
  styleUrl: './stores-data-post.css',
})
export class StoresDataPost {
  storesService: StoresService = inject(StoresService);
  change: ChangeDetectorRef = inject(ChangeDetectorRef);
  router = inject(Router);

  storeForm = new FormGroup({
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

  error: string | null = null;
  success: string | null = null;

  handleSubmit() {
    this.error = null;
    this.success = null;
    this.storeForm.markAllAsTouched();

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
      this.change.detectChanges();
      return;
    }

    this.storesService.createStore(this.storeForm.value).subscribe({
      next: (data: any) => {
        this.success = data.msg + ' with ID: ' + data.data.storeId;
        this.error = null;
        this.storeForm.reset();
        this.change.detectChanges();
      },
      error: (err: any) => {
        this.success = null;
        this.error = err.error?.msg || 'Something went wrong';
        this.change.detectChanges();
      },
    });
  }

  goBack() { this.router.navigate(['/modules/stores']); }
}
