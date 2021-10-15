import { Component, OnInit } from '@angular/core';

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

  onSubmit() {
    console.log("Authenticating...")
  }

}
