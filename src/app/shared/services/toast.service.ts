// This service manages toast messages shown in the application.
// It lets components trigger user feedback without duplicating notification logic.

import { Injectable } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];

  // Displays a toast message with the selected type and duration.
  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000): void {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = { message, type, id };
    this.toasts.push(toast);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  // Removes the matching toast message from the active notification list.
  remove(id: string): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  // Clears all toast messages from the current notification list.
  clear(): void {
    this.toasts = [];
  }
}
