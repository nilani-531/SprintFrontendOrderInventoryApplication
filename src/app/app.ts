import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomersApiDisplay } from './modules/customers/customers-api-display/customers-api-display';
import { Login } from './login/login';
import { OrdersDataDelete } from './modules/orders/dataDisplay/orders-data-delete/orders-data-delete';
import { OrderItemsDataDelete } from './modules/ordeItems/dataDisplay/order-items-data-delete/order-items-data-delete';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomersApiDisplay, Login, OrdersDataDelete,OrderItemsDataDelete],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('OrderInventoryApplicationFrontend');
}
