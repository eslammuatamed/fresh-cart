import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { product } from 'src/app/shared/interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private _EcomdataService: EcomdataService) {}
  produtsSubscribe!: Subscription;
  categoriesSubscribe!: Subscription;
  products: product[] = [];
  categories: any[] = [];
  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 1000,
    navText: ['', ''],
    items: 1,
    nav: true,
  };
  ngOnInit() {
    this.produtsSubscribe = this._EcomdataService.getProducts().subscribe({
      next: (data) => {
        this.products = data.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.categoriesSubscribe = this._EcomdataService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.data;
      },
    });
  }
  ngOnDestroy() {
    this.produtsSubscribe.unsubscribe();
    this.categoriesSubscribe.unsubscribe();
  }
}
