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
    this.studentApplicationStatusListener = this.studentService.applicationStatus.subscribe(status => {
      this.studentApplicationStatus = status;
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
