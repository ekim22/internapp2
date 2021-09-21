import {Component, Input, OnInit, Output} from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  title = '';
  content = '';

  constructor(private postsService: PostService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.postsService.addPost(new Post(this.title, this.content));
  }

}
