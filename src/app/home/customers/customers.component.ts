import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  Customers: any;
  constructor(
    private http: HttpClient
  ) { }
  baseUrl: string = "https://localhost:44303/api/";
  ngOnInit(): void {
    this.http.get(this.baseUrl + "Admin/GetCustomers").subscribe({
      next: async (response) => {
        this.Customers = response;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  deactivate(customerId:number){
    try{
      this.http.patch(this.baseUrl+"Admin/DeativateCustomer?customerId="+customerId, {}, {responseType: 'text'}).subscribe({
        next: (res) => {
          this.Customers = this.Customers.filter((customer:any)=>{
           return customer.customerId !=  customerId;
          });
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
    catch(e){
      console.log(e);
    }
  }
}
