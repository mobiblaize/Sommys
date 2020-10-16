import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
    ) { }

  canActivate( ):boolean {
    if (this._authService.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['admin/login']);
      return false;
    }
  }
}
