import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  hide = true;
  private loginListener!: Subscription;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginListener = this.authService.loggedIn.subscribe((isLogged) => {
      this.isLoading = !!isLogged;
    });
  }

  onLogin(form: NgForm) {
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.loginListener.unsubscribe();
  }

}
