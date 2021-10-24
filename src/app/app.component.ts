import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {PageService} from "./posts/page.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mean-tutorial';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.autoLogout();
    }
  }
}
