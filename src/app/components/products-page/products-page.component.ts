import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  constructor(private _EcomdataService: EcomdataService) {}
  products: product[] = [];
  productsSubscription: Subscription = new Subscription();
  ngOnInit(): void {
    this.productsSubscription = this._EcomdataService.getProducts().subscribe({
      next: (data) => {
        this.products = data.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
