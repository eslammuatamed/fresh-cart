import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private _HttpClient: HttpClient) {}
  headers: any = { token: localStorage.getItem('eToken') };
  getWishList(): Observable<any> {
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        headers: this.headers,
      }
    );
  }

  addToWishList(id: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      { productId: id },
      { headers: this.headers }
    );
  }

  deleteItem(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      { headers: this.headers }
    );
  }
}
