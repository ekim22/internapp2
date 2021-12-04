import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<boolean> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const token = localStorage.getItem('id_token');
    if (typeof token === "string") {
      const tokenPayload: {email: string, password: string, role: string} = decode(token);
      if (tokenPayload['role'] === 'student') {
        this.router.navigate(['/student/home']);
      }
      else if (tokenPayload['role'] === 'coordinator') {
        this.router.navigate(['/coordinator/home']);
      }
      else if (tokenPayload['role'] === 'admin') {
        this.router.navigate(['/admin/home']);
      }
    }
    return of(true);
  }
}
