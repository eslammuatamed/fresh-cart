import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router);
  let _AuthService = inject(AuthService);
  _AuthService.decodeUserToken();
  if (!_AuthService.decodedToken?.id) {
    _Router.navigate(['/login']);
    return false;
  }

  return true;
};
