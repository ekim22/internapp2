import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../post.model";
import {Subscription} from "rxjs";
import {MatAccordion} from "@angular/material/expansion";
import {PageEvent} from "@angular/material/paginator";
import {PageService} from "../page.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsOpened = 0;
  // Angular counts pages from 0
  currentPage!: number;
  pageSize!: number;
  // Default set to 0 and updates when postService returns getPosts()
  totalNumberOfPosts = 0;
  pageSizeOptions!: number[];
  listExpandOrCollapse: string = 'Expand';
  private postsChangedSub!: Subscription;
  public isLoading = false;

  constructor(private postService: PostService,
              private pageService: PageService) { }

  ngOnInit(): void {
    this.pageSize = this.pageService.pageSize;
    this.currentPage = this.pageService.pageIndex
    this.pageSizeOptions = this.pageService.pageSizeOptions;
    this.postService.getPosts(this.currentPage, this.pageSize);
    this.isLoading = true;
    this.postsChangedSub = this.postService.getPostChangedListener().subscribe(
      (postData: {posts: Post[]; postCount: number}) => {
        this.posts = postData.posts;
        this.totalNumberOfPosts = postData.postCount;
        this.isLoading = false;
      }
    )
  }

  ngOnDestroy(): void {
    this.postsChangedSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.currentPage, this.pageSize)
    });
    this.listExpandOrCollapse = 'Expand';
  }

  onExpandOrCollapse(accordion: MatAccordion) {
    if (this.listExpandOrCollapse === 'Collapse') {
      accordion.closeAll();
    } else if (this.listExpandOrCollapse === 'Expand') {
      accordion.openAll();
    }
  }

  onChangedPageSize(pageData: PageEvent) {
    this.pageSize = pageData.pageSize;
    this.currentPage = pageData.pageIndex;
    this.postsOpened = 0;
    this.pageService.pageSize = this.pageSize;
    this.pageService.pageIndex = this.currentPage;
    this.isLoading = true;

    this.postService.getPosts(this.currentPage, this.pageSize);
    this.listExpandOrCollapse = 'Expand';
  }

  onPostClosed() {
    this.postsOpened -= 1;
    if (this.postsOpened === 0 && this.postsOpened < this.pageSize) {
      this.listExpandOrCollapse = 'Expand';
    }
  }

  onPostOpened() {
    this.postsOpened += 1;
    if (Math.floor(this.totalNumberOfPosts / this.pageSize) === this.currentPage && this.pageSize != 1) {
      if (this.postsOpened === this.totalNumberOfPosts % this.pageSize && this.postsOpened > 0) {
        this.listExpandOrCollapse = 'Collapse'
      }
    }
    else if (this.postsOpened === this.pageSize && this.postsOpened > 0) {
      this.listExpandOrCollapse = 'Collapse';
    }
  }
}
