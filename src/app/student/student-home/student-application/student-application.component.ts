import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {StudentService} from "../../student.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {StepperOrientation} from "@angular/cdk/stepper";
import {BreakpointObserver} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {UserService} from "../../../user/user.service";

export interface Task {
  name: string;
  completed: boolean;
  // color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-student-application',
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.css'],
  animations: [
    trigger('widthGrow', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1}))
      ])
    ])
  ]
})
export class StudentApplicationComponent implements OnInit, OnDestroy {
  announcementsSub!: Subscription;

  // TODO rename 'task' to something like appSteps
  task: Task = {
    name: 'Application Steps',
    completed: false,
    // TODO get subtasks from server
    subtasks: [],
  };

  updateAllComplete() {
    return this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  studentAppType!: string;
  appInfoSub!: Subscription;
  appStepsSub!: Subscription;
  stepperOrientation!: Observable<StepperOrientation>;
  showComments: boolean = false;
  // TODO: this needs to be set in the listener that subscribes to the subject that pushes new comments to the application.
  commentBadgeHidden = false;
  // TODO: set with service later
  commentBadges = 1;
  // TODO: gonna need to get this from a service too
  appType = '';
  appProgress = 0;
  appStatus = '';
  isMobileResolution!: boolean;
  mobileResolutionSub!: Subscription;

  constructor(private studentService: StudentService,
              private userService: UserService,
              private router: Router,
              breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 1050px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    this.mobileResolutionSub = breakpointObserver.observe('(max-width: 665px)').subscribe(result => {
      this.isMobileResolution = result.matches;
    })
  }

  ngOnInit(): void {
    this.appStepsSub = this.studentService.getAppSteps().subscribe(res => {
      this.appType = this.studentService.getAppType();
      this.appStatus = this.studentService.getAppStatus();
      this.appProgress = Number(this.studentService.getAppProgress());
      res.appSteps.forEach(val => this.task.subtasks?.push(val))
    }, (error => this.router.navigate(['/student/apply'])));
    // this.appInfoSub = this.studentService.getAppInfo().subscribe(res => {
    //   this.studentAppType = res.appInfo.appType;
    //   this.applicationProgress = parseFloat(res.appInfo.appProgress);
    //   console.log(res.appInfo)
    //   this.applicationStatus = res.appInfo.appStatus;
    //   for (let step of res.appInfo.appSteps) {
    //     this.task.subtasks?.push(step);
    //   }
    //   console.log(this.task)
    // }, (err) => {
    //   this.router.navigate(['/student/apply'])
    // });
  }

  ngOnDestroy(): void {
    this.appStepsSub.unsubscribe();
  }

  onViewComments() {
    this.showComments = !this.showComments;
  }

  setCommentsAsRead() {
    this.commentBadges = 0;
  }

  resumeApplication() {
    this.router.navigate(['/' + this.appType])
  }

  get userName() {
    return this.userService.userName;
  }


}
