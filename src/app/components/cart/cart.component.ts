import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { cartData } from 'src/app/shared/interfaces/cart-data';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(private _cartService: CartService, private _Router: Router) {}
  getSubscriptions: Subscription = new Subscription();
  cartDetails: cartData = {} as cartData;
  itemsNum: number = 0;
  ngOnInit(): void {
    this._cartService.getCart().subscribe({
      next: (data) => {
        this.cartDetails = data.data;
        this.itemsNum = this.cartDetails.products.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteItem(id: string): void {
    this._cartService.deleteItem(id).subscribe({
      next: (data) => {
        this.cartDetails = data.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  changecount(id: string, count: number): void {
    if (count > 0) {
      this._cartService.updateItem(id, count).subscribe({
        next: (data) => {
          this.cartDetails = data.data;
          this.itemsNum = this.cartDetails.products.length;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  clear() {
    this._cartService.deleteCart().subscribe({
      next: (data) => {
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.getSubscriptions.unsubscribe();
  }
}
