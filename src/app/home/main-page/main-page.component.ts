import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: Router
  ) { }
  vendors: any;
  vendorsLength: any;
  Categories: any;
  CategoriesLength: any;
  Products: any;
  ProductsLength: any;
  Customers: any;
  CustomersLength: any;
  baseUrl: string = "https://localhost:44303/api/";
  ngOnInit(): void {
    this.http.get(this.baseUrl + "Vendor/GetVendors").subscribe({
      next: (response) => {
        this.vendors = response;
        this.vendorsLength = this.vendors.length;
      },
      error: (e) => {
        console.log(e);
      }
    })
    this.http.get(this.baseUrl + "Category/GetCategories").subscribe({
      next: (response) => {
        this.Categories = response;
        this.CategoriesLength = this.Categories.length;
      },
      error: (e) => {
        console.log(e);
      }
    })
    this.http.get(this.baseUrl + "Product/GetProducts").subscribe({
      next: (response) => {
        this.Products = response;
        this.ProductsLength = this.Products.length;
      },
      error: (e) => {
        console.log(e);
      }
    })
    this.http.get(this.baseUrl + "Admin/GetCustomers").subscribe({
      next: (response) => {
        this.Customers = response;
        this.CustomersLength = this.Customers.length;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  handleClick(link: string) {
    this.route.navigate(['/'+link])
  }
}
