import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.css']
})
export class CategoriesDetailComponent implements OnInit {
  roll: string = '';
  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpClient
  ) { }
  baseUrl: string = "https://localhost:44303/api/";
  categoryId: number | undefined;
  categoryDetail: any;
  categoryRecived: boolean = false;
  ngOnInit() {
    var role = localStorage.getItem('roll')
    if (role != null) {
      this.roll = role;
    }
    this.activeRoute.params.subscribe(params => {
      this.categoryId = params['id'];
    });
    this.http.get(this.baseUrl + "Product/GetProductsByCategoryId?categoryId=" + this.categoryId).subscribe({
      next: async (response) => {
        this.categoryDetail = response;
        this.categoryRecived = true;
        await this.loadData();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  async loadData() {
    try {
      let likesResponse = await this.getLikes();
      const likes = likesResponse as any[];
      this.categoryDetail = this.categoryDetail.map((product: any) => {
        const filePath = product.imagePath.split('/').pop();
        if (filePath) {
          product.imagePath = this.getImageUrl(filePath);
        } else {
          product.imagePath = '';
        }
        if (this.roll == 'Customer') {
          let isLikes = likes.some((x: any) => x.productId == product.productId);
          product.isLikes = isLikes;
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
  async like(id: number) {
    try {
      let likesResponse = await this.getLikes();
      const likes = likesResponse as any[];
      let isLikes = likes.some((x: any) => x.productId == id);
      if (isLikes) {
        await firstValueFrom(this.http.delete(this.baseUrl + "Customer/RemoveCustomerIntrest?productId=" + id, { responseType: 'text' }));
        this.categoryDetail = this.categoryDetail.map((product: any) => {
          if (id === product.productId) {
            product.isLikes = false;
          }
          return product;
        });
        return;
      }
      await firstValueFrom(this.http.post(this.baseUrl + "Customer/AddCustomerIntrest?productId=" + id, {}, { responseType: 'text' }));
      this.categoryDetail = this.categoryDetail.map((product: any) => {
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
