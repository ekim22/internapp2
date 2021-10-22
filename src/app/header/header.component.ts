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
  private loginListener!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginListener = this.authService.loggedIn.subscribe((isLogged) => {
      this.isAuthenticated = !!isLogged;
    })
  }

  ngOnDestroy() {
    this.loginListener.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
