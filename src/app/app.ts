import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomersApiDisplay } from './modules/customers/customers-api-display/customers-api-display';
import { Login } from './login/login';
import { CustomersDataGet } from "./modules/customers/dataDisplay/customers-data-get/customers-data-get";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomersApiDisplay, Login, CustomersDataGet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('OrderInventoryApplicationFrontend');
}
