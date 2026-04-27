// This component shows the home page of the application.
// It helps users understand the project and move to different modules.


import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Initializes this component and prepares the dependencies used in the file.
  constructor(private router: Router) {}

  // Handles click and updates the related state safely.
  handleClick(user: string) {
    // Store the selected user in sessionStorage for pre-filling login
    sessionStorage.setItem('selectedUser', user);
    this.router.navigate(['/login']);
  }
}
