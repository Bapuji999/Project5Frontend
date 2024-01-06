import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { VendorsComponent } from './vendors/vendors.component';
import { VendorsDetailComponent } from './vendors-detail/vendors-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesDetailComponent } from './categories-detail/categories-detail.component';
import { ProductsComponent } from './products/products.component';
import { LikesComponent } from './likes/likes.component';
import { CustomersComponent } from './customers/customers.component';
import { MyproductsComponent } from './myproducts/myproducts.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainPageComponent,
    VendorsComponent,
    VendorsDetailComponent,
    CategoriesComponent,
    CategoriesDetailComponent,
    ProductsComponent,
    LikesComponent,
    CustomersComponent,
    MyproductsComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModule { }
