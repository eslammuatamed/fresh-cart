import { product } from './../../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _EcomdataService: EcomdataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  productDetails: product = {} as product;
  productSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    navSpeed: 1000,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let idProduct = params.get('id')!;
        this._EcomdataService.getDetailsProduct(idProduct).subscribe({
          next: (data) => {
            this.productDetails = data.data;
            console.log(this.productDetails);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }

  addToCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.cartCount.next(res.numOfCartItems);
      },
      error: (err) => {
        this._ToastrService.error(err.message);
      },
    });
  }
}
