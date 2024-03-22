import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _Router: Router
  ) {}
  cartId: string = '';
  checkout: FormGroup = this._FormBuilder.group({
    details: ['', [Validators.required]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id')!;
      },
    });
  }

  handelCash() {
    console.log('tmam');

    this._CartService.checkoutCash(this.cartId, this.checkout.value).subscribe({
      next: (data) => {
        if (data.status == 'success') {
          console.log('success');
          this._Router.navigate(['/allorders']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  handelPayment() {
    this._CartService
      .checkoutPayment(this.cartId, this.checkout.value)
      .subscribe({
        next: (data) => {
          if (data.status == 'success') {
            window.open(data.session.url, '_self');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
