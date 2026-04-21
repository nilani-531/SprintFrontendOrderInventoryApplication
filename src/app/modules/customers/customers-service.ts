import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface customers{
  customerId:number,
  fullName:String,
  emailAddress:String
  

}
@Injectable({
  providedIn: 'root',
})
export class CustomersService {
http:HttpClient=inject(HttpClient)

getAllCustomers(){
  return this.http.get("http://localhost:9090/api/customers")
}


getCustomerById(customerId:number){
  return this.http.get(`http://localhost:9090/api/customers/${customerId}`)
}

}
