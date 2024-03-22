import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnDestroy {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishListService: WishListService
  ) {}
  @Input() product: product = {} as product;
  @Input() wishproduct!: boolean;

  addToCartSubscription: Subscription = new Subscription();
  addToCart(id: string): void {
    this.addToCartSubscription = this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        this._ToastrService.error(err.message);
      },
    });
  }

  addToWishList(e: any, id: string) {
    this._WishListService.addToWishList(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        e.target.classList.add('text-red');
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
