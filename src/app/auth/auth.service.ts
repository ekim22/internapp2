import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthData} from "./auth-data.model";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import * as moment from "moment/moment";
import {tap} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean | null>(this.isLoggedIn());

  constructor(private httpClient: HttpClient,
              private router: Router) {}

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password}
    this.httpClient.post(environment.apiUrl + 'users/signup', authData).subscribe((res) => {
      this.login(email, password);
    }, error => {
      setTimeout(() => {
        this.loggedIn.next(false);
      }, 2000)
    })
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password}
    this.httpClient.post<{token: string, expiresIn: number}>(environment.apiUrl + 'users/login', authData).pipe(tap(
      ({token, expiresIn}) => {
        AuthService.setSession({token, expiresIn})
      }
    )).subscribe(res => {
      this.router.navigate(['/']);
      this.loggedIn.next(this.isLoggedIn());
      this.autoLogout();
    }, error => {
      setTimeout(() => {
        this.loggedIn.next(false);
      }, 2000)
    })
  }

  private static setSession(authResult: {token: string, expiresIn: number}) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  private static clearSession() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  logout() {
    AuthService.clearSession();
    this.router.navigate(['/auth/login']);
    this.loggedIn.next(this.isLoggedIn());
  }

  isLoggedIn() {
    return moment().isBefore(this.getTokenExpiration());
  }

  autoLogout() {
    if (this.isLoggedIn()) {
      setTimeout(() => {
        this.logout()
      }, this.getTokenExpiration().valueOf() - moment().valueOf())
    }
  }

  getTokenExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }
}
