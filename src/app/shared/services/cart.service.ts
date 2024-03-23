import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService
  ) {}

  cartCount: BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { productId: id }
    );
  }
  getCart(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart');
  }
  deleteCart(): Observable<any> {
    return this._HttpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart'
    );
  }

  deleteItem(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`
    );
  }

  updateItem(id: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: count }
    );
  }

  checkoutCash(id: string, checkout: Object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
      { shippingAddress: checkout }
    );
  }
  checkoutPayment(id: string, checkout: Object): Observable<any> {
    if (window.location.host == 'localhost:4200') {
      return this._HttpClient.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200/#`,
        { shippingAddress: checkout }
      );
    }
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://eslammuatamed.github.io/fresh-cart/#`,
      { shippingAddress: checkout }
    );
  }

  getAllOrders(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${this._AuthService.decodedToken.id}`
    );
  }
}
