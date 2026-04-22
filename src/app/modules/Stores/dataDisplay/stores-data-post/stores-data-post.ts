import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoresService } from '../../stores-service';

@Component({
  selector: 'app-stores-data-post',
  imports: [ReactiveFormsModule],
  templateUrl: './stores-data-post.html',
  styleUrl: './stores-data-post.css',
})
export class StoresDataPost {
  storesService: StoresService = inject(StoresService);
  change: ChangeDetectorRef = inject(ChangeDetectorRef);

  storeForm = new FormGroup({
    storeName: new FormControl('', [Validators.required]),
    webAddress: new FormControl('', [Validators.required, Validators.pattern(/^(https?:\/\/)/)]),
    physicalAddress: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
  });

  error: any = null;
  success: any = null;

  handleSubmit() {
    console.log(this.storeForm.value);

    if (this.storeForm.valid) {
      this.storesService.createStore(this.storeForm.value).subscribe({
        next: (data: any) => {
          this.success = data.msg + ' with ID: ' + data.data.storeId;
          this.error = null;
          this.storeForm.reset();
          this.change.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.success = null;
          if (err.error && err.error.msg) {
            this.error = err.error.msg;
          } else if (err.status === 0) {
            this.error = 'Cannot connect to server';
          } else {
            this.error = 'Something went wrong';
          }
          this.change.detectChanges();
        },
      });
    }
  }
}
