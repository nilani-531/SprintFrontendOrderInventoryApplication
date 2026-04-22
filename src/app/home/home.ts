
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) {}

  handleClick(user: string) {
    console.log("Button clicked for user:", user);
    // Optionally, store the selected user in sessionStorage for pre-filling login
    sessionStorage.setItem('selectedUser', user);
    this.router.navigate(['/login']);
  }
}
