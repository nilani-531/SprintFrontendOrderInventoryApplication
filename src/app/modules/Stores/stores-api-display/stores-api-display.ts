import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-stores-api-display',
  imports: [RouterLink, NgFor, RouterOutlet],
  templateUrl: './stores-api-display.html',
  styleUrl: './stores-api-display.css',
})
export class StoresApiDisplay {
  // List of all Stores API endpoints used in UI
  endpoints = [
    { name: 'Get All Stores', method: 'GET', route: 'get-all', desc: 'Get all store details from system database' },
    { name: 'Get Store By ID', method: 'GET', route: 'get-by-id', desc: 'Get store details using given store ID' },
    { name: 'Get Store By Name', method: 'GET', route: 'get-by-name', desc: 'Get store details using given store name' },
    { name: 'Create Store', method: 'POST', route: 'create', desc: 'Create new store by providing store name, address and location details' },
    { name: 'Update Store', method: 'PUT', route: 'update', desc: 'Update existing store details using store ID' },
    { name: 'Delete Store', method: 'DELETE', route: 'delete', desc: 'Delete store record using given store ID' }
  ];
}
