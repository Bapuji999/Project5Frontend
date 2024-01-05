import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
  constructor(
    private http: HttpClient
  ) { }
  baseUrl: string = "https://localhost:44303/api/";
  products: any;
  ngOnInit(): void {
    this.http.get(this.baseUrl + "Customer/GetCustomerIntrest").subscribe({
      next: async (response) => {
        this.products = response;
        await this.loadData();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  async loadData() {
    try {
      this.products = this.products.map((product: any) => {
        const filePath = product.imagePath.split('/').pop();
        if (filePath) {
          product.imagePath = this.getImageUrl(filePath);
        } else {
          product.imagePath = '';
        }
        product.isLikes = true;
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
        this.products = await this.getLikes();
        await this.loadData();
      }
    } catch (error) {
      console.error(error);
    }
  }
  async getLikes() {
    const likesResponse = await firstValueFrom(this.http.get(this.baseUrl + "Customer/GetCustomerIntrest"));
    if (likesResponse && likesResponse.hasOwnProperty('message')) {
      return [];
    }
    return likesResponse;
  }
}
