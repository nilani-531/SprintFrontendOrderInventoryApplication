import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { NgFor } from "@angular/common";

@Component({
  selector: 'app-shipments-api-display',
  imports: [RouterLink, NgFor, RouterOutlet],
  templateUrl: './shipments-api-display.html',
  styleUrl: './shipments-api-display.css',
})
export class ShipmentsApiDisplay {

  // List of all shipment API endpoints used in UI
   endpoints = [
    { name: 'Get All Shipments', method: 'GET', route: 'get-all', desc: 'Get all shipment details from system database' },
    { name: 'Get Shipment By ID', method: 'GET', route: 'get-by-id', desc: 'Get shipment details using given shipment ID' },
    { name: 'Create Shipment', method: 'POST', route: 'create', desc: 'Create new shipment by providing required details' },
    { name: 'Update Shipment', method: 'PUT', route: 'update', desc: 'Update existing shipment details using shipment ID' },
    { name: 'Delete Shipment', method: 'DELETE', route: 'delete', desc: 'Delete shipment record using given shipment ID' },
    { name: 'Update Status', method:'PATCH', route: 'status', desc: 'Update only the shipment status of record' },
    { name: 'Get By Customer ID', method: 'GET', route: 'get-by-customerId', desc: 'Get shipments based on given customer ID' },
    { name: 'Get By Store ID', method: 'GET', route: 'get-by-storeId', desc: 'Get shipments handled by given store ID' },
    { name: 'Get By Shipment Status', method: 'GET', route: 'get-by-status', desc: 'Get shipments filtered by current shipment status' }
  ];
}
