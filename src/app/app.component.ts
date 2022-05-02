import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {StudentService} from "./student/student.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {UserService} from "./user/user.service";
import {ProfileService} from "./user/profile/profile.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'intern-app';
  isAuthenticated!: boolean;
  role!: string;
  color = 'default';
  // TODO This all sucks. Should be handled
  //  in a more general way. Probably on login.
  // studentAppTypeListener!: Subscription;
  // studentAppStatusListener!: Subscription;
  // studentAppProgressListener!: Subscription;

  constructor(private authService: AuthService,
              private studentService: StudentService,
              private userService: UserService,
              private profileService: ProfileService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.autoLogout();
      this.userService.getUserInfo().subscribe((res) => {
        this.userName.next(res.name);
        this.userEmail.next(res.email);
      });
      this.profileService.getProfile();
    }
    this.authService.loggedIn.subscribe((isLogged) => {
      this.isAuthenticated = !!isLogged;
    });
    this.authService.userRole$.subscribe(userRole => {
      this.role = userRole;
      if (this.role === 'student') {
        console.log("LOGGING USER ROLE IN APP COMP...", this.role)
        this.studentService.getAppInfo();
        // this.studentAppStatusListener = this.studentService.getAppStatus().subscribe(res => {
        //   console.log('APP COMP, appStat ', res.appStatus);
        //   this.appStatus.next(res.appStatus);
        // });
        // this.studentAppTypeListener = this.studentService.getAppType().subscribe(res => {
        //   console.log('APP COMP, appType ', res.appType)
        //   this.appType.next(res.appType);
        // });
        // this.studentAppProgressListener = this.studentService.getAppProgress().subscribe(res => {
        //   console.log('APP COMP, appProg ', res.appProgress)
        //   this.appProgress.next(res.appProgress);
        // })
      }
    });

  }

  changeColor() {
    this.color = this.color === 'default' ? 'alternative' : 'default';
    console.log(this.color)
  }

  get userName() {
    return this.userService.userName;
  }

  get userEmail() {
    return this.userService.userEmail;
  }

  get appType() {
    return this.studentService.getAppType();
  }

  get appStatus() {
    return this.studentService.getAppStatus();
  }

  get appProgress() {
    return this.studentService.getAppProgress();
  }
}
