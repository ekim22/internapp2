import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private name =  new BehaviorSubject<string | null>('');
  private email =  new BehaviorSubject<string | null>('');
  role!: string;

  constructor(private httpClient: HttpClient) { }

  get userName() {
    return this.name;
  }

  get userEmail() {
    return this.email;
  }

  getUserInfo() {
    return this.httpClient.get<{name: string, email: string}>(environment.apiUrl + 'users/info');
  }

}
