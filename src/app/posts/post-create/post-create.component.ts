import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  text = 'hello';
  paraText!: String;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.text)
    this.paraText = this.text;
  }

}
