import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class CoordinatorGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(route.routeConfig?.path)
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('id_token');
    const tokenPayload: { email: string, userId: string, role: string } = decode(token as string);
    if (tokenPayload['role'].toLowerCase() === expectedRole) {
      return this.router.createUrlTree(['/coordinator/home'])
    }
    return false
  }

}
