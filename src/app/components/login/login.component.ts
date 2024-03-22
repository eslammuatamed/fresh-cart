import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  msgErr: string = '';

  loading: boolean = false;

  loginSubscription: Subscription = new Subscription();

  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{5,8}$/),
  //   ]),
  // });
  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{5,8}$/)],
    ],
  });
  handel(): void {
    this.msgErr = '';
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginSubscription = this._AuthService
        .login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            if (res.message == 'success') {
              localStorage.setItem('eToken', res.token);
              this._AuthService.decodeUserToken();
              this.loading = false;
              this._Router.navigate(['/home']);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.loading = false;
            this.msgErr = err.error.message;
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
