import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated!: boolean;
  private isLoggedIn!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loggedIn.subscribe((isLogged: boolean) => {
      this.isAuthenticated = isLogged;
    })
  }

  ngOnDestroy() {
    this.isLoggedIn.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
