import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// TODO this doesn't do anything. I got distracted by other things but the original intention was to guard against navigating away from an application that's been modified by the student by deploying a dialog to confirm nav away. Still a good idea...

@Injectable({
  providedIn: 'root'
})
export class DirtyCheckGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
