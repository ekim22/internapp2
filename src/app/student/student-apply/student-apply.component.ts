import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student-apply',
  templateUrl: './student-apply.component.html',
  styleUrls: ['./student-apply.component.css']
})
export class StudentApplyComponent implements OnInit {
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
