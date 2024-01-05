import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  roll: string = '';
  constructor(
    private http: HttpClient
  ){}
  baseUrl: string = "https://localhost:44303/api/";
  vendors: any;
  ngOnInit(): void {
    var role = localStorage.getItem('roll')
    if (role != null) {
      this.roll = role;
    }
    this.http.get(this.baseUrl + "Vendor/GetVendors").subscribe({
      next: (response) => {
        this.vendors = response;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  deactivate(vendorId:number){
    try{
      this.http.patch(this.baseUrl+"Admin/DeativateVendor?vendorId="+vendorId, {}, {responseType: 'text'}).subscribe({
        next: (res) => {
          this.vendors = this.vendors.filter((vendor:any)=>{
           return vendor.vendorId !=  vendorId;
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
