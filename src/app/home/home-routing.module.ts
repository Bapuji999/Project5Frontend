import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { VendorsComponent } from './vendors/vendors.component';
import { VendorsDetailComponent } from './vendors-detail/vendors-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesDetailComponent } from './categories-detail/categories-detail.component';
import { ProductsComponent } from './products/products.component';
import { LikesComponent } from './likes/likes.component';
import { isCustomerGuard } from '../Guards/is-customer.guard';
import { CustomersComponent } from './customers/customers.component';
import { adminGuard } from '../Guards/admin.guard';
import { MyproductsComponent } from './myproducts/myproducts.component';
import { vendorGuard } from '../Guards/vendor.guard';

const routes: Routes = [
  {path:'', component:MainPageComponent},
  {path:'vendors', component:VendorsComponent},
  {path:'vendors/:id', component:VendorsDetailComponent},
  {path:'categories', component:CategoriesComponent},
  {path:'categories/:id', component:CategoriesDetailComponent},
  {path:'products', component:ProductsComponent},
  {path:'customers', component:CustomersComponent, canActivate:[adminGuard]},
  {path:'myProducts', component:MyproductsComponent, canActivate:[vendorGuard]},
  {path:'likes', component:LikesComponent, canActivate:[isCustomerGuard]},
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '*', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
