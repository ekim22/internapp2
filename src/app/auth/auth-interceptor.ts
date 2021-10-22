import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

/* Interceptors are different from other services. Injectable is REQUIRED, but
* it's also different because we don't include the providedIn: "root" part. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem("id_token");

    if (authToken) {
      // We clone because modifying the request directly can lead to undesirable
      // side effects.
      const authRequest = req.clone({
        // set doesn't override; just adds, unless it already exists.
        // 'Authorization' is important because that's the value used on line 6 of
        // check-auth.js (case-insensitive)
        headers: req.headers.set('Authorization', "Bearer " + authToken)
      });
      return next.handle(authRequest);
    }
    else {
      return next.handle(req);
    }
  }
}
