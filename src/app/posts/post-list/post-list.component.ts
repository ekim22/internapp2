import { Component, OnInit } from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../post.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts!: Post[]
  private postsChangedSub!: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.postsChangedSub = this.postService.postsChanged.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    )
  }

}
