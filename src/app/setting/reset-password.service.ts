import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private _HttpClient: HttpClient) {}
  email: string = '';

  sendEmail(email: string): Observable<any> {
    this.email = email;
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      {
        email: email,
      }
    );
  }
  verifyCode(code: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      {
        resetCode: code,
      }
    );
  }
  resetPassword(form: string): Observable<any> {
    return this._HttpClient.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      form
    );
  }
}
