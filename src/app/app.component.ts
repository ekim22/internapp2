import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {StudentService} from "./student/student.service";
import {UserService} from "./user/user.service";
import {ProfileService} from "./user/profile/profile.service";
import {AppProgressType} from "./shared/models/AppProgressType";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'intern-app';
  progressType = AppProgressType;
  isAuthenticated!: boolean;
  role!: string;
  color = 'default';

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
        this.studentService.getAppInfo();
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
