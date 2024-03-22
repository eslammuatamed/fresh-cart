import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  decodedToken: any;
  register(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      userData
    );
  }
  login(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      userData
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }

  decodeUserToken(): void {
    if (localStorage.getItem('eToken') != null) {
      const token: any = localStorage.getItem('eToken');
      const decodedToken = jwtDecode(token);
      this.decodedToken = decodedToken;
    }
  }
}
