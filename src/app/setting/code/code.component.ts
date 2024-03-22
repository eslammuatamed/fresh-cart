import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResetPasswordService } from '../reset-password.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css'],
})
export class CodeComponent implements OnDestroy {
  constructor(
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private _ResetPasswordService: ResetPasswordService
  ) {}

  msgErr: string = '';

  loading: boolean = false;

  resetSubscription: Subscription = new Subscription();
  resetForm: FormGroup = this._FormBuilder.group({
    code: ['', [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]],
  });

  handel(): void {
    this.loading = true;
    const code = this.resetForm.get('code');
    this.resetSubscription = this._ResetPasswordService
      .verifyCode(code?.value)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this._Router.navigate(['/setting/reset']);
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
