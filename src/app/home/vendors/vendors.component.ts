import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  constructor(
    private http: HttpClient
  ){}
  baseUrl: string = "https://localhost:44303/api/";
  vendors: any;
  ngOnInit(): void {
    this.http.get(this.baseUrl + "Vendor/GetVendors").subscribe({
      next: (response) => {
        debugger;
        this.vendors = response;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
