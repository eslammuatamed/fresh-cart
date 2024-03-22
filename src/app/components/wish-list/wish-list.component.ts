import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WishListData } from 'src/app/shared/interfaces/wish-list-data';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit, OnDestroy {
  constructor(
    private _cartService: CartService,
    private _ToastrService: ToastrService,
    private _WishListService: WishListService
  ) {}
  wishData: WishListData = {} as WishListData;

  addToCartSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getWishList();
  }
  getWishList(): void {
    this._WishListService.getWishList().subscribe({
      next: (data) => {
        this.wishData = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteItem(id: string): void {
    console.log(id);

    this._WishListService.deleteItem(id).subscribe({
      next: (data) => {
        this._ToastrService.success(data.message);
        this.getWishList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(id: string): void {
    this.addToCartSubscription = this._cartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this.deleteItem(id);
      },
      error: (err) => {
        this._ToastrService.error(err.message);
      },
    });
  }

  ngOnDestroy(): void {
    this.addToCartSubscription.unsubscribe();
  }
}
