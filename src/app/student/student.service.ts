import { Injectable } from '@angular/core';
import {BehaviorSubject, ReplaySubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BioApplication} from "../departments/bio/bio.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private appType!: string;
  private appStatus!: string;
  private appProgress!: string;

  private appType$ = new ReplaySubject<string>();
  private appStatus$ = new ReplaySubject<string>();
  private appProgress$ = new ReplaySubject<string>();
  announcements$ = new BehaviorSubject('');

  constructor(private httpClient: HttpClient) {
    this.appType$.subscribe(val => this.appType = val);
    this.appStatus$.subscribe(val => this.appStatus = val);
    this.appProgress$.subscribe(val => this.appProgress = val);
  }


  setAppType(appType: string) {
    const studentAppType = {appType: appType}
    this.httpClient.post(environment.apiUrl + 'student/appType', studentAppType).subscribe((res) => {
      console.log("Set student application type: " + appType)
      console.log(res);
    })
    this.appType$.next(appType);
  }

  setAppStatus(appStatus: string) {
    const studentAppStatus = {appStatus: appStatus}
    this.httpClient.post(environment.apiUrl + 'student/appStatus', studentAppStatus).subscribe((res) => {

    })
    this.appStatus$.next(appStatus);
  }

  setAppProgress(appProgress: string) {
    const studentAppProgress = {appProgress: appProgress}
    this.httpClient.post(environment.apiUrl + 'student/appProgress', studentAppProgress).subscribe((res) => {
      console.log(res)
    })
    this.appProgress$.next(appProgress);
  }

  getAppInfo() {
    this.httpClient.get<{appType: string, appStatus: string, appProgress: string}>(environment.apiUrl + 'student/appInfo').subscribe(appInfo => {
      this.appType = appInfo.appType;
      this.appType$.next(this.appType);
      this.appStatus = appInfo.appStatus;
      this.appStatus$.next(this.appStatus);
      this.appProgress = appInfo.appProgress;
      this.appProgress$.next(this.appProgress);
    });
  }

  getAppSteps() {
    return this.httpClient.get<{appSteps: []}>(environment.apiUrl + 'student/appSteps');
  }

  // TODO this needs to go into bioService if possible or refactor into a general saveStudApp() that can call the right saveApp depending on the appType.


  getAppType() {
    return this.appType;
  }

  get appTypeSub() {
    return this.appType$;
  }

  getAppStatus() {
    return this.appStatus;
  }

  get appStatusSub() {
    return this.appStatus$;
  }

  getAppProgress() {
    return this.appProgress;
  }

  get appProgressSub() {
    return this.appProgress$;
  }

}
