import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResetPasswordService } from '../reset-password.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnDestroy, OnInit {
  constructor(
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private _ResetPasswordService: ResetPasswordService
  ) {}

  msgErr: string = '';

  loading: boolean = false;

  email: string = '';
  ngOnInit(): void {
    this.email = this._ResetPasswordService.email;
    console.log(this._ResetPasswordService.email);
  }

  resetSubscription: Subscription = new Subscription();
  resetForm: FormGroup = this._FormBuilder.group({
    email: [this.email, [Validators.required, Validators.email]],
    newPassword: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{5,8}$/)],
    ],
  });

  handel(): void {
    console.log(this.resetForm.value);

    this.resetSubscription = this._ResetPasswordService
      .resetPassword(this.resetForm.value)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this._Router.navigate(['/login']);
        },
        error: (err) => {
          this.loading = false;
          this.msgErr = err.message;
        },
      });
  }

  ngOnDestroy(): void {
    this.resetSubscription.unsubscribe();
  }
}
