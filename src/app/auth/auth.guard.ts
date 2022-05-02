import {
  ActivatedRouteSnapshot,
  CanActivate, CanLoad, Route,
  Router,
  RouterStateSnapshot, UrlSegment,
  UrlTree
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import * as moment from "moment/moment";
import decode from "jwt-decode";


@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = localStorage.getItem("id_token");
    const isTokenNotExpired = moment().isBefore(this.authService.getTokenExpiration());

    if (authToken && isTokenNotExpired) {
      const tokenPayload: {email: string, password: string, role: string} = decode(authToken);
      this.authService.userRole$.next(tokenPayload.role.toLowerCase());
      return true;
    }
    return this.router.createUrlTree(['/auth/login'])
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isTokenNotExpired = moment().isBefore(this.authService.getTokenExpiration());
    if (isTokenNotExpired) {
      return true;
    }
    return this.router.createUrlTree(['/auth/login'])
  }

}
