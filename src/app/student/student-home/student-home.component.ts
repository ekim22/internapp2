import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentService} from "../student.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit, OnDestroy {
  applicationStatusListener!: Subscription;
  appStatus!: string;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    // this.appStatus = this.studentService.getAppStatus();
    // console.log('logging app status in student home: ' + this.appStatus)
    this.applicationStatusListener = this.studentService.appStatusSub.subscribe((appStatus) => {
      this.appStatus = appStatus;
      console.log('logging app status in student home subscribe: ' + this.appStatus)
    });
  }

  ngOnDestroy() {
    this.applicationStatusListener.unsubscribe();
  }
}
