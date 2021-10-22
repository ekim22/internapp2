import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthData} from "./auth-data.model";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import * as moment from "moment/moment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean | null>(this.isLoggedIn());

  constructor(private httpClient: HttpClient,
              private router: Router) {}

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password}
    this.httpClient.post('http://localhost:3000/api/users/signup', authData).subscribe(res => {
      if (res) {
        console.log(res)
        this.login(email, password);
      }
    })
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password}
    this.httpClient.post<{token: string, expiresIn: number}>('http://localhost:3000/api/users/login', authData).subscribe(res => {
      AuthService.setSession(res);
      this.router.navigate(['/']);
      this.loggedIn.next(this.isLoggedIn());
      this.autoLogout();
    })
  }

  private static setSession(authResult: {token: string, expiresIn: number}) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.router.navigate(['/login']);
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
