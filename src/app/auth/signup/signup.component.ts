import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  hide = true;
  private loginListener!: Subscription;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginListener = this.authService.loggedIn.subscribe((isLogged) => {
      this.isLoading = !!isLogged;
    });
  }

  onSignup(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.loginListener.unsubscribe();
  }

}
