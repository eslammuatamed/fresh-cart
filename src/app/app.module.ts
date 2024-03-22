import { LoadingComponent } from './components/loading/loading.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { CartComponent } from './components/cart/cart.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './components/details/details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PricePipe } from './price.pipe';
import { TermTextPipe } from './term-text.pipe';
import { SearchPipe } from './search.pipe';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { MyHttpInterceptor } from './my-http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    ProductsComponent,
    ProductComponent,
    WishListComponent,
    CategoriesComponent,
    BrandsComponent,
    LoginComponent,
    RegisterComponent,
    LoadingComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    NavAuthComponent,
    CartComponent,
    NotfoundComponent,
    DetailsComponent,
    PricePipe,
    TermTextPipe,
    SearchPipe,
    ProductsPageComponent,
    CheckoutComponent,
    AllordersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
