import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  isLoggedIn: boolean = false;
  hide = true;
  isFormInvalid = false;
  private loginListener!: Subscription;


  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginListener = this.authService.loggedIn.subscribe((isLogged) => {
      this.isLoading = !!isLogged;
      this.isLoggedIn = !!isLogged;
    });
    if (this.isLoggedIn) {
      this.authService.logout();
    }
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.authService.login(form.value.email, form.value.password);
    } else {
      alert('Please enter a valid email and password.')
      this.isFormInvalid = true;
    }
  }

  ngOnDestroy() {
    this.isLoading = false;
    this.loginListener.unsubscribe();
  }

}
