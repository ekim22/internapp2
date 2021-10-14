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
  // Angular counts pages from 0
  currentPage = 0;
  // Default set to 0 and updates when postService returns getPosts()
  postCount = 0;
  pageSizeOptions = [1, 3, 6, 12, 18]
  pageSizeDefault = 10;
  listExpandOrCollapse: string = 'Expand';
  private postsChangedSub!: Subscription;
  public isLoading = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts(this.currentPage, this.pageSizeDefault);
    this.isLoading = true;
    this.postsChangedSub = this.postService.getPostChangedListener().subscribe(
      (postData: {posts: Post[]; postCount: number}) => {
        this.posts = postData.posts;
        this.postCount = postData.postCount;
        this.isLoading = false;
      }
    )
  }

  ngOnDestroy(): void {
    this.postsChangedSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.currentPage, this.pageSizeDefault)
    });
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
    this.isLoading = true;
    this.currentPage = pageData.pageIndex;
    this.pageSizeDefault = pageData.pageSize;
    this.postService.getPosts(this.currentPage, this.pageSizeDefault);
  }

}
