import {Component, Input, OnInit, Output} from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../post.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {


  constructor(private postsService: PostService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let newPost: Post = {title: form.value.title, content: form.value.content};
    this.postsService.addPost(newPost);
  }

}
