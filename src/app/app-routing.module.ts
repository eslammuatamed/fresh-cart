import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'checkout/:id', component: CheckoutComponent, title: 'checkout' },
      { path: 'details/:id', component: DetailsComponent, title: 'Details' },
      { path: 'wish-list', component: WishListComponent, title: 'Wish List' },
      { path: 'products', component: ProductsPageComponent, title: 'Products' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      { path: 'allorders', component: AllordersComponent, title: 'all orders' },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      {
        path: 'setting',
        loadChildren: () =>
          import('./setting/setting.module').then((m) => m.SettingModule),
      },
      { path: 'register', component: RegisterComponent, title: 'Register' },
    ],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
