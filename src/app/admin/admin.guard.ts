import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth/auth.service";
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['auth/login']);
      return false;
    }
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('id_token');
    if (typeof token === "string") {
      const tokenPayload: {email: string, password: string, role: string} = decode(token);
      if (tokenPayload['role'] !== expectedRole) {
        return false;
      }
    }
    return true;
  }

}
