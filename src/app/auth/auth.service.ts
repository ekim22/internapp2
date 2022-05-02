import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthData} from "./auth-data.model";
import {Router} from "@angular/router";
import {BehaviorSubject, ReplaySubject} from "rxjs";
import * as moment from "moment/moment";
import {tap} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean | null>(this.isLoggedIn());
  userRole$ = new ReplaySubject<string>();

  constructor(private httpClient: HttpClient,
              private router: Router,
              private userService: UserService) {}

  createStudent(name: string, email: string, password: string) {
    const authData: AuthData = {email: email, password: password}
    this.httpClient.post(environment.apiUrl + 'student/signup', {name: name, ...authData}).subscribe((res) => {
      this.login(email, password);
    }, error => {
      setTimeout(() => {
        this.loggedIn.next(false);
      }, 2000)
    })
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password}
    this.httpClient.post<{token: string, expiresIn: number, userRole: string, name: string}>(environment.apiUrl + 'users/login', authData).pipe(tap(
      ({token, expiresIn, userRole, name}) => {
        AuthService.setSession({token, expiresIn, userRole});
        this.userService.userName.next(name);
        this.userService.userEmail.next(email);
      }
    )).subscribe(res => {
      const userRole = res.userRole.toLowerCase();
      this.userRole$.next(userRole);
      this.loggedIn.next(this.isLoggedIn());
      if (userRole === 'student') {
        this.router.navigate(['/student/home']);
      } else if (userRole === 'coordinator') {
        this.router.navigate(['/coordinator/home']);
      } else if (userRole === 'admin') {
        this.router.navigate(['/admin/home']);
      } else {
        this.router.navigate([''])
      }
      this.autoLogout();
    }, error => {
      console.log(error)
      setTimeout(() => {
        this.loggedIn.next(false);
      }, 2000)
    })
  }

  private static setSession(authResult: {token: string, expiresIn: number, userRole: string}) {
    const expiresAt = moment().add(authResult.expiresIn, "second");

    localStorage.setItem("id_token", authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("userRole", authResult.userRole.toLowerCase());
  }

  private static clearSession() {
    localStorage.clear();
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

  getUserRole(): string {
    if (localStorage.getItem("userRole") !== null) {
      return (localStorage.getItem("userRole") as string).toLowerCase();
    }
    return '';
  }
}
