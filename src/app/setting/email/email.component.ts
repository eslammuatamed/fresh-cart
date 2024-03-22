import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResetPasswordService } from '../reset-password.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnDestroy {
  constructor(
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private _ResetPasswordService: ResetPasswordService
  ) {}

  msgErr: string = '';

  loading: boolean = false;

  resetSubscription: Subscription = new Subscription();
  resetForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  handel(): void {
    const email = this.resetForm.get('email');
    console.log(email);

    this.resetSubscription = this._ResetPasswordService
      .sendEmail(email?.value)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this._Router.navigate(['/setting/code']);
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
