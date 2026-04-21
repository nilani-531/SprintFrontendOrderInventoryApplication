import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
  AbstractControl
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginError: string = '';
  isLoading: boolean = false;

  /**
   * Maps each known username to the frontend route they should land on after login.
   * - karthi  → products & inventory (KARTHI role)
   * - nilani  → orders              (NILANI role)
   * - pooja   → stores              (POOJA role)
   * - abinaya → customers           (ABINAYA role)
   * - yamini  → shipments           (YAMINI role)
   * - admin   → products (full access, ADMIN role)
   */
  private readonly userRouteMap: { [key: string]: string } = {
    'karthi':  '/products',
    'nilani':  '/home',
    'pooja':   '/home',
    'abinaya': '/home',
    'yamini':  '/home',
    'admin':   '/products'
  };

  /**
   * Maps each username to a backend endpoint they are authorised to call.
   * Used as a credential-validation probe request.
   * - 200/any 2xx → credentials valid, proceed
   * - 403          → credentials valid but resource-specific 403; still accepted
   * - 401          → invalid credentials
   */
  private readonly userEndpointMap: { [key: string]: string } = {
    'karthi':  'http://localhost:9090/products',
    'nilani':  'http://localhost:9090/orders',
    'pooja':   'http://localhost:9090/stores',
    'abinaya': 'http://localhost:9090/customers',
    'yamini':  'http://localhost:9090/shipments',
    'admin':   'http://localhost:9090/products'
  };

  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      this.noSpace
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(private http: HttpClient, private router: Router) {}

  /** Validator: reject values that contain spaces. */
  noSpace(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && typeof value === 'string' && value.includes(' ')) {
      return { noSpaceError: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const username = this.loginForm.value.userName!.toLowerCase().trim();
    const password = this.loginForm.value.password!;

    // Build the Basic Auth header value: Base64("username:password")
    const encoded = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({ 'Authorization': `Basic ${encoded}` });

    // Choose the probe URL; fall back to /products if user is unknown
    const probeUrl =
      this.userEndpointMap[username] ?? 'http://localhost:9090/products';

    this.isLoading = true;
    this.loginError = '';

    this.http.get<any>(probeUrl, { headers }).subscribe({
      next: () => {
        // 2xx → credentials valid
        this.storeAndNavigate(username, encoded);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          // Wrong username or password
          this.loginError = 'Invalid username or password. Please try again.';
        } else if (err.status === 403) {
          // Credentials are valid; the endpoint just returned Forbidden for
          // this specific resource (e.g. ADMIN probing a role-restricted path).
          // Treat as successful login.
          this.storeAndNavigate(username, encoded);
        } else if (err.status === 0) {
          this.loginError = 'Cannot reach the server. Make sure the backend is running on port 9090.';
        } else {
          this.loginError = `Server error (${err.status}). Please try again later.`;
        }
      }
    });
  }

  /** Persist credentials for subsequent API calls and navigate to the home route. */
  private storeAndNavigate(username: string, encodedCredentials: string): void {
    // Store under a predictable key so HTTP services can pick them up
    sessionStorage.setItem('authCredentials', encodedCredentials);
    sessionStorage.setItem('loggedInUser', username);
    this.isLoading = false;
    const route = this.userRouteMap[username] ?? '/home';
    this.router.navigate([route]);
  }
}

