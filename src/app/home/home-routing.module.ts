import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { VendorsComponent } from './vendors/vendors.component';
import { VendorsDetailComponent } from './vendors-detail/vendors-detail.component';

const routes: Routes = [
  {path:'', component:MainPageComponent},
  {path:'vendors', component:VendorsComponent},
  {path:'vendors/:id', component:VendorsDetailComponent},
  { path: '*', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
