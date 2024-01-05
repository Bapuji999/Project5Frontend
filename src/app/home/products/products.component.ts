import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
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
      const productsResponse = await firstValueFrom(this.http.get(this.baseUrl + "Product/GetProducts"));
      this.products = productsResponse as any[];
      let likesResponse = await this.getLikes();
      const likes = likesResponse as any[];
      this.products = this.products.map((product: any) => {
        const filePath = product.imagePath.split('/').pop();
        if (filePath) {
          product.imagePath = this.getImageUrl(filePath);
        } else {
          product.imagePath = '';
        }
        let isLikes = likes.some((x: any) => x.productId == product.productId);
        product.isLikes = isLikes;
        return product;
      });
    } catch (error) {
      console.error(error);
    }
  }
  getImageUrl(filePath: string): string {
    return `${this.baseUrl}Image/download/${encodeURIComponent(filePath)}`;
  }
  async like(id: number) {
    try {
      let likesResponse = await this.getLikes();
      const likes = likesResponse as any[];
      let isLikes = likes.some((x: any) => x.productId == id);
      if (isLikes) {
        await firstValueFrom(this.http.delete(this.baseUrl + "Customer/RemoveCustomerIntrest?productId=" + id, { responseType: 'text' }));
        this.products = this.products.map((product: any) => {
          if (id === product.productId) {
            product.isLikes = false;
          }
          return product;
        });
        return;
      }
      await firstValueFrom(this.http.post(this.baseUrl + "Customer/AddCustomerIntrest?productId=" + id, {}, { responseType: 'text' }));
      this.products = this.products.map((product: any) => {
        if (id === product.productId) {
          product.isLikes = true;
        }
        return product;
      });
    } catch (error) {
      console.error(error);
    }
  }
  async getLikes() {
    if (this.roll != 'Customer') {
      return [];
    }
    const likesResponse = await firstValueFrom(this.http.get(this.baseUrl + "Customer/GetCustomerIntrest"));
    if (likesResponse && likesResponse.hasOwnProperty('message')) {
      return [];
    }
    return likesResponse;
  }
}
