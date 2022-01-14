import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  applicationStatus!: string;

  constructor() { }


  getAppInfo() {
    return this.httpClient.get<{appInfo: {appType: string, appProgress: string, appSteps: []}}>(environment.apiUrl + 'student/appInfo');
  }


}
