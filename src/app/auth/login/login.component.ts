import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = true;

  constructor() { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  onLogin(form: NgForm) {
    console.log(form.value);
  }

}
