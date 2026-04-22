import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomersApiDisplay } from './modules/customers/customers-api-display/customers-api-display';
import { Login } from './login/login';
import { ShipmentsDataPost } from "./modules/shipments/dataDisplay/shipments-data-post/shipments-data-post";
import { ShipmentsDataPut } from "./modules/shipments/dataDisplay/shipments-data-put/shipments-data-put";
import { ShipmentsDataDelete } from "./modules/shipments/dataDisplay/shipments-data-delete/shipments-data-delete";
import { ShipmentsApiDisplay } from "./modules/shipments/shipments-api-display/shipments-api-display";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomersApiDisplay, Login, ShipmentsDataPost, ShipmentsDataPut, ShipmentsDataDelete, ShipmentsApiDisplay],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('OrderInventoryApplicationFrontend');
}