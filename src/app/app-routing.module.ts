import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard, notLoginGuard } from './Guards/login.guard';
import { NavBarComponent } from './Layout/nav-bar/nav-bar.component';

const routes: Routes = [{
  path: '',
  component: NavBarComponent,
  children: [
    {
      path: '',
      canActivate: [loginGuard],
      loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    },
  ],
},
{ path: 'login',canActivate: [notLoginGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
