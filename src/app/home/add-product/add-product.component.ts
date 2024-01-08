import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toster:ToastrService
  ) { }
  addCategory: boolean =false;
  form: any;
  categories:any;
  categoryName: string = ''
  baseUrl: string = "https://localhost:44303/api/";
  formData: any = new FormData();
  ngOnInit() {
    this.getCategories();
    this.form = this.fb.group({
      productName: ['', [Validators.required]],
      price: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      image: [null, [Validators.required]]
    });
  }
  getCategories(){
    this.http.get(this.baseUrl + "Category/GetCategories").subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  onSubmit() {
    if (this.form.valid) {
      const categoryId = this.form.value.categoryId;
      const apiUrl = `${this.baseUrl}Product/AddProduct`;
      const queryParams = `?productName=${encodeURIComponent(this.form.get('productName').value)}&price=${encodeURIComponent(this.form.get('price').value)}&rating=${encodeURIComponent(this.form.get('rating').value)}&categoryId=${encodeURIComponent(categoryId)}`;
      const urlWithParams = apiUrl + queryParams;
      this.http.post(urlWithParams, this.formData, {responseType:'text'}).subscribe({
        next: (response) => {
          this.toster.success(response);
        },
        error: (error) => {
          this.toster.error(error.error);
          console.error('API error:', error.error.title);
        }
      });
    }
    else {
      this.toster.warning('Form is invalid');
    }
  }
  onFileChange(event: any) {
    this.formData = new FormData();
    const file: File = event.target.files[0];
    if (file) {
      this.formData.append("image", file);
    }
  }
  showCategoryForm(){
    this.addCategory = !this.addCategory;
  }
  categoryAdd(){
    if(this.categoryName == ''){
      this.toster.warning("Category can not be empty");
      return;
    }
    const apiUrl = `${this.baseUrl}Category/AddCategory?categoryName=${this.categoryName}`;
    this.http.post(apiUrl, {}, {responseType:'text'}).subscribe({
      next: (response) => {
        this.toster.success(response);
        this.getCategories();
      },
      error: (error) => {
        this.toster.error(error.error);
        console.error('API error:', error.error.title);
      }
    });
  }
}
