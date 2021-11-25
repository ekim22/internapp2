import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  disableSelect = new FormControl(false);
  application: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.application)
  }

}
