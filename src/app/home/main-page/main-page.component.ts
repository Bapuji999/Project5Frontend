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
  likes: any;
  likesLength: any;
  myProducts: any;
  myProductsLength: any;
  baseUrl: string = "https://localhost:44303/api/";
  roll: string = '';
  ngOnInit(): void {
    var role = localStorage.getItem('roll')
    if (role != null) {
      this.roll = role;
    }
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
    if (this.roll == 'Admin') {
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
    if (this.roll == 'Customer') {
      this.http.get(this.baseUrl + "Customer/GetCustomerIntrest").subscribe({
        next: (response) => {
          this.likes = response;
          this.likesLength = this.likes.length;
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
    if (this.roll == 'Vendor') {
      this.http.get(this.baseUrl + "Product/GetProductsOfVendor").subscribe({
        next: (response) => {
          this.myProducts = response;
          this.myProductsLength = this.myProducts.length;
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  }
  handleClick(link: string) {
    this.route.navigate(['/' + link])
  }
}
