import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomersApiDisplay } from "./modules/customers/customers-api-display/customers-api-display";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomersApiDisplay],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('OrderInventoryApplicationFrontend');
}
