import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthData} from "./auth-data.model";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loggedIn = new Subject<boolean>();

  constructor(private httpClient: HttpClient,
              private router: Router) {}

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password}
    this.httpClient.post('http://localhost:3000/api/users/signup', authData).subscribe(res => {
      if (res)
      console.log(res)
      this.login(email, password);
    })
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password}
    this.httpClient.post('http://localhost:3000/api/users/login', authData).subscribe(res => {
      if (res)
        console.log(res)
        this.loggedIn.next(true);
        this.router.navigate(['/']);
    })
  }
}
