import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent  implements OnInit {
  constructor(
    private http: HttpClient
  ) { }
  baseUrl: string = "https://localhost:44303/api/";
  products: any;
  roll: string = '';
  async ngOnInit() {
    var role = localStorage.getItem('roll')
    if (role != null) {
      this.roll = role;
    }
    await this.loadData();
  }
  async loadData() {
    try {
      const productsResponse = await firstValueFrom(this.http.get(this.baseUrl + "Product/GetProductsOfVendor"));
      this.products = productsResponse as any[];
      this.products = this.products.map((product: any) => {
        const filePath = product.imagePath.split('/').pop();
        if (filePath) {
          product.imagePath = this.getImageUrl(filePath);
        } else {
          product.imagePath = '';
        }
        return product;
      });
    } catch (error) {
      console.error(error);
    }
  }
  getImageUrl(filePath: string): string {
    return `${this.baseUrl}Image/download/${encodeURIComponent(filePath)}`;
  }
}

