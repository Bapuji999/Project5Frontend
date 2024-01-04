import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-vendors-detail',
  templateUrl: './vendors-detail.component.html',
  styleUrls: ['./vendors-detail.component.css']
})
export class VendorsDetailComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpClient
  ) { }
  baseUrl: string = "https://localhost:44303/api/";
  vendorId:number | undefined;
  vendorDetail:any;
  vendorRecived:boolean = false;
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.vendorId = params['id'];
    });
    this.http.get(this.baseUrl + "Vendor/GetVendorDetailById?vendorId=" + this.vendorId).subscribe({
      next: (response) => {
        this.vendorDetail = response;
        this.vendorRecived = true;
        this.vendorDetail.products.map((product:any) => {
          const filePath = product.imagePath.split('/').pop();
          if (filePath) {
            product.imagePath = this.getImageUrl(filePath);
          }
          else{
            product.imagePath = '';
          }
          return product;
        });
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  getImageUrl(filePath: string): string {
    return `${this.baseUrl}Image/download/${encodeURIComponent(filePath)}`;
  }
}
