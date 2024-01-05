import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent  implements OnInit {
  constructor(
    private http: HttpClient
  ){}
  baseUrl: string = "https://localhost:44303/api/";
  categories: any;
  ngOnInit(): void {
    this.http.get(this.baseUrl + "Category/GetCategories").subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
