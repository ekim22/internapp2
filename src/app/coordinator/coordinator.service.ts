import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApplicationData} from "./application.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {
  private appId!: string;

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getApplications() {
    return this.httpClient.get<{studentApplications: ApplicationData[]}>(environment.apiUrl + 'coordinator/departments')
  }

  getApplication(dept: string, studentId: string) {
    // TODO will need to change this if IT is added
    this.router.navigate(['/bio', {studentId: studentId, isCoordinator: true}])
  }

  markApplicationApproved(studentId: string) {
    const appInfo = {
      studentId: studentId
    }
    this.httpClient.post(environment.apiUrl + 'coordinator/approve-application', appInfo).subscribe(value => {
      console.log(value)
    })
  }

}

