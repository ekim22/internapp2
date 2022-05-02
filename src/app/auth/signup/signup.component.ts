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
  isFormInvalid = false;
  private loginListener!: Subscription;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginListener = this.authService.loggedIn.subscribe((isLogged) => {
      this.isLoading = !!isLogged;
    });
  }

  onSignup(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.authService.createStudent(form.value.name, form.value.email, form.value.password);
    } else {
      alert('sign up failed')
      this.isFormInvalid = true;
    }
  }

  ngOnDestroy() {
    this.loginListener.unsubscribe();
  }

}
