import { Component } from '@angular/core';

import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="access-denied-container">
      <div class="access-denied-card">
        <div class="icon-circle">🚫</div>
        <h1>Access Denied</h1>
        <p class="main-msg">You don't have permission to access this resource.</p>
        <p class="sub-msg">Contact your administrator if you believe this is an error.</p>
        <div class="btn-group">
          <button class="btn-primary" (click)="goBack()">← Go Back</button>
          <button class="btn-secondary" (click)="goDashboard()">Go to Dashboard</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .access-denied-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #ede9fe 0%, #f0f0f8 50%, #e0e7ff 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }

      .access-denied-card {
        text-align: center;
        padding: 48px 40px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(124, 58, 237, 0.12);
        max-width: 460px;
        width: 100%;
        border: 1px solid rgba(124, 58, 237, 0.08);
      }

      .icon-circle {
        font-size: 60px;
        margin-bottom: 24px;
        display: block;
      }

      h1 {
        font-size: 26px;
        font-weight: 700;
        color: #1e1b4b;
        margin-bottom: 12px;
      }

      .main-msg {
        color: #374151;
        font-size: 15px;
        margin-bottom: 8px;
      }

      .sub-msg {
        color: #6b7280;
        font-size: 13px;
        margin-bottom: 32px;
      }

      .btn-group {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .btn-primary {
        background: linear-gradient(90deg, #7c3aed, #a855f7);
        color: white;
        border: none;
        padding: 11px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        font-family: inherit;
        box-shadow: 0 3px 10px rgba(124, 58, 237, 0.3);
        transition: all 0.2s;
      }

      .btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 5px 16px rgba(124, 58, 237, 0.4);
      }

      .btn-secondary {
        background: #f3f4f6;
        color: #374151;
        border: 1px solid #d1d5db;
        padding: 11px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        font-family: inherit;
        transition: all 0.2s;
      }

      .btn-secondary:hover {
        background: #e5e7eb;
      }
    `,
  ],
})
export class AccessDeniedComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/api-dashboard']);
  }

  goDashboard(): void {
    this.router.navigate(['/api-dashboard']);
  }
}
