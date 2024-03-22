import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  msgErr: string = '';

  loading: boolean = false;

  registerSubscription: Subscription = new Subscription();

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{5,8}$/),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{5,8}$/),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );

  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({ confirmPassword: true });
    }
  }
  handel(): void {
    this.msgErr = '';
    if (this.registerForm.valid) {
      this.loading = true;
      this.registerSubscription = this._AuthService
        .register(this.registerForm.value)
        .subscribe({
          next: (res) => {
            if (res.message == 'success') {
              this.loading = false;
              this._Router.navigate(['/login']);
            }
          },
          error: (err) => {
            this.loading = false;
            this.msgErr = err.message;
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe();
  }
}
