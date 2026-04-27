import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  loginError: string = '';
  loginSuccess: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      this.noSpace
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Pre-fill username if user came from home page
    const selectedUser = sessionStorage.getItem('selectedUser');
    if (selectedUser) {
      this.loginForm.patchValue({ userName: selectedUser });
      sessionStorage.removeItem('selectedUser');
    }
  }

  /** Validator: reject values that contain spaces. */
  noSpace(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && typeof value === 'string' && value.includes(' ')) {
      return { noSpaceError: true };
    }
    return null;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const username = this.loginForm.value.userName!.toLowerCase().trim();
    const password = this.loginForm.value.password!;

    this.isLoading = true;
    this.loginError = '';
    this.loginSuccess = '';

    this.authService.login(username, password).subscribe({
      next: () => {
        // Login successful
        const encoded = btoa(`${username}:${password}`);
        this.authService.storeCredentials(username, encoded);
        this.loginSuccess = 'Login successful! Redirecting...';

        setTimeout(() => {
          this.isLoading = false;
          const route = this.authService.getDefaultModuleRoute();
          this.router.navigate([route]);
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.loginError = 'Invalid username or password. Please try again.';
        } else if (err.status === 403) {
          // Credentials are valid; endpoint returned Forbidden
          const encoded = btoa(`${username}:${password}`);
          this.authService.storeCredentials(username, encoded);
          this.loginSuccess = 'Login successful! Redirecting...';

          setTimeout(() => {
            this.isLoading = false;
            const route = this.authService.getDefaultModuleRoute();
            this.router.navigate([route]);
          }, 1500);
        } else if (err.status === 0) {
          this.loginError = 'Cannot reach the server. Make sure the backend is running on port 9090.';
        } else {
          this.loginError = `Server error (${err.status}). Please try again later.`;
        }
      }
    });
  }
}
