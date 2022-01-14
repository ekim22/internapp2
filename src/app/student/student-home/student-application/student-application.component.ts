import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {StudentService} from "../student.service";

@Component({
  selector: 'app-student-application',
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.css']
})
export class StudentApplicationComponent implements OnInit, OnDestroy {
  studentApplicationStatus!: string;
  studentApplicationStatusListener!: Subscription;
  statuses = [
    'complete',
    'incomplete',
    'needs review',
    'rescinded',
    'postponed',
    'site declined'
  ];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentApplicationTypeListener = this.studentService.getAppType().subscribe(
      (student) => {
        this.studentAppType = student.appType;
      }
    )
    this.studentApplicationProgressListener = this.studentService.getAppProgress().subscribe(
      (student) => {
        this.applicationProgress = parseFloat(student.appProgress);
      }
    )
    this.studentService.getAppInfo().subscribe(res => {
      this.studentAppType = res.appInfo.appType;
      this.applicationProgress = parseFloat(res.appInfo.appProgress);
      for (let step of res.appInfo.appSteps) {
        this.task.subtasks?.push(step);
      }
    })
  }

  ngOnDestroy() {
    this.studentApplicationStatusListener.unsubscribe();
  }

  changeStatus() {
    console.log(this.statuses[Math.floor((Math.random() * 6))])
    this.studentService.setApplicationStatus(this.statuses[Math.floor((Math.random() * 6))])
  }

}
