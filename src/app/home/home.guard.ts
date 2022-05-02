import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      return this.router.createUrlTree(['/auth/login'])
    } else if (userRole === 'student') {
      return this.router.createUrlTree(['/student/home'])
    } else if (userRole === 'coordinator') {
      return this.router.createUrlTree(['/coordinator/home'])
    } else if (userRole === 'admin') {
      return this.router.createUrlTree(['/admin/home'])
    }
    return true;
  }

}
