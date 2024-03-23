import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService
  ) {}
  itemsNum: number = 0;

  ngOnInit(): void {
    this._CartService.cartCount.subscribe({
      next: (data) => {
        this.itemsNum = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._CartService.getCart().subscribe({
      next: (data) => {
        this._CartService.cartCount.next(data.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout(): void {
    this._AuthService.logout();
  }
}
