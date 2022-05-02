import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Profile} from "./profile-model";
import {ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profile = new ReplaySubject<Profile>();

  constructor(private httpClient: HttpClient) { }

  makeInitials(name: string) {
    return name.split(' ').map((n: string) => n.substr(0,1)).join('');
  }

  // TODO need to merge userService and profileService. They're redundant at this point, and I'm leaning towards merging U into P.
  getProfile() {
    this.httpClient.get<{profile: Profile}>(environment.apiUrl + 'profile').subscribe((res) => {
      this.profile.next(res.profile)
      this.profile.subscribe(val => {
        console.log('logging profile ', val)
      })
    })
  }

  updateProfile() {

  }

  get userProfile() {
    return this.profile;
  }

}
