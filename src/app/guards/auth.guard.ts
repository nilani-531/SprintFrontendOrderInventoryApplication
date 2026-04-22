import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) { }

  /**
   * Prevents access to protected routes if user is not authenticated
   */
  canActivate(): boolean {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return false;
    }
    
    return true;
  }
}
