import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InventoryApiDisplay } from "./modules/inventory/inventory-api-display/inventory-api-display";
import { ProductsApiDisplay } from "./modules/products/products-api-display/products-api-display";
import { InventoryDataDelete } from "./modules/inventory/dataDisplay/inventory-data-delete/inventory-data-delete";
import { InventoryDataGet } from "./modules/inventory/dataDisplay/inventory-data-get/inventory-data-get";
import { InventoryDataPost } from "./modules/inventory/dataDisplay/inventory-data-post/inventory-data-post";
import { InventoryDataPut } from "./modules/inventory/dataDisplay/inventory-data-put/inventory-data-put";
import { ProductsDataDelete } from "./modules/products/dataDisplay/products-data-delete/products-data-delete";
import { ProductsDataPost } from "./modules/products/dataDisplay/products-data-post/products-data-post";
import { ProductsDataGet } from "./modules/products/dataDisplay/products-data-get/products-data-get";
import { ProductsDataPut } from "./modules/products/dataDisplay/products-data-put/products-data-put";
import { Login } from "./login/login";
import { ApiDashboard } from "./modules/api-dashboard/api-dashboard";
import { Home } from "./home/home";
import { OrdersDataGet } from "./modules/orders/dataDisplay/orders-data-get/orders-data-get";
import { OrderItemsDataGet } from "./modules/ordeItems/dataDisplay/order-items-data-get/order-items-data-get";
import { OrdersApiDispaly } from "./modules/orders/orders-api-dispaly/orders-api-dispaly";
import { OrderItemsApiDisplay } from "./modules/ordeItems/order-items-api-display/order-items-api-display";
import { OrdersDataPut } from "./modules/orders/dataDisplay/orders-data-put/orders-data-put";
import { OrderItemsDataPut } from "./modules/ordeItems/dataDisplay/order-items-data-put/order-items-data-put";
import { OrderItemsDataPost } from "./modules/ordeItems/dataDisplay/order-items-data-post/order-items-data-post";
import { OrdersDataPost } from "./modules/orders/dataDisplay/orders-data-post/orders-data-post";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InventoryApiDisplay, ProductsApiDisplay, InventoryDataDelete, InventoryDataGet, InventoryDataPost, InventoryDataPut, OrderItemsDataPut, ProductsDataDelete, ProductsDataPost, ProductsDataGet, ProductsDataPut, Login, ApiDashboard, Home, OrdersDataGet, OrderItemsDataGet, OrdersApiDispaly, OrderItemsApiDisplay, OrdersDataPut, OrderItemsDataPut, OrderItemsDataPost, OrdersDataPost],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('OrderInventoryApplicationFrontend');
}