import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../post.model";
import {Subscription} from "rxjs";
import {MatAccordion} from "@angular/material/expansion";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postCount = 0;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10, 15]
  listExpandOrCollapse: string = 'Expand';
  private postsChangedSub!: Subscription;
  public isLoading = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.isLoading = true;
    this.postsChangedSub = this.postService.getPostChangedListener().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        this.postCount = this.posts.length;
        this.isLoading = false;
      }
    )
  }

  ngOnDestroy(): void {
    this.postsChangedSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  onExpandOrCollapse(accordion: MatAccordion) {
    if (this.listExpandOrCollapse === 'Collapse') {
      accordion.closeAll();
    } else if (this.listExpandOrCollapse === 'Expand') {
      accordion.openAll();
    }
    this.listExpandOrCollapse = this.listExpandOrCollapse === 'Collapse' ? 'Expand' : 'Collapse';
  }

  onChangedPageSize(pageData: PageEvent) {
    console.log(pageData)
  }

}
