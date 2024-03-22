import { Component, Input } from '@angular/core';
import { product } from 'src/app/shared/interfaces/product';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(private _WishListService: WishListService) {}
  @Input() products: product[] = [];
  wishProductId: string[] = [];
  searchTerm: string = '';
  layout: any = {
    one: false,
    three: false,
    sex: true,
  };

  ngOnInit(): void {
    this.wishProduct();
  }

  wishProduct() {
    this._WishListService.getWishList().subscribe({
      next: (data) => {
        const products = data.data;
        for (let i = 0; i < products.length; i++) {
          const element = products[i];
          this.wishProductId.push(element._id);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  change1(): void {
    this.layout.one = true;
    this.layout.three = false;
    this.layout.sex = false;
  }
  change2(): void {
    this.layout.one = false;
    this.layout.three = true;
    this.layout.sex = false;
  }
  change3(): void {
    this.layout.one = false;
    this.layout.three = false;
    this.layout.sex = true;
  }
}
