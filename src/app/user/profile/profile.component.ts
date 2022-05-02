import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-profile.js',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  get userName() {
    return this.userService.userName;
  }

  get userEmail() {
    return this.userService.userEmail;
  }

}
