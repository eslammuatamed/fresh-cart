import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  constructor(private _CartService: CartService) {}
  orders: any[] = [];
  ngOnInit(): void {
    this._CartService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
