import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomersApiDisplay } from './modules/customers/customers-api-display/customers-api-display';
import { Login } from './login/login';
import { ProductsDataPut } from './modules/products/dataDisplay/products-data-put/products-data-put';
import { CustomersDataPut } from "./modules/customers/dataDisplay/customers-data-put/customers-data-put";
import { CustomersDataDelete } from "./modules/customers/dataDisplay/customers-data-delete/customers-data-delete";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomersApiDisplay, Login, ProductsDataPut, CustomersDataPut, CustomersDataDelete],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('OrderInventoryApplicationFrontend');
}