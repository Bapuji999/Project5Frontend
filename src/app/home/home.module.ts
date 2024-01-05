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


@NgModule({
  declarations: [
    MainPageComponent,
    VendorsComponent,
    VendorsDetailComponent,
    CategoriesComponent,
    CategoriesDetailComponent,
    ProductsComponent,
    LikesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ]
})
export class HomeModule { }
