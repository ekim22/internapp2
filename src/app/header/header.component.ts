import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  private isLoggedIn!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loggedIn.subscribe((isLogged: boolean) => {
      this.isAuthenticated = isLogged;
    })
  }

  onLogout() {
    this.authService.logout();
  }

}
