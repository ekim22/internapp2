import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  disableSelect = new FormControl(false);
  program: string = '';


  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.program.toLowerCase() === 'bio') {
      this.router.navigate(['/bio'])
    } else if (this.program.toLowerCase() === 'itec') {
      this.router.navigate(['/itec'])
    }
  }

}
