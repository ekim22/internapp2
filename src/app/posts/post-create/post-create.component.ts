import {Component, Input, OnInit, Output} from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../post.model";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId!: string | null;
  public post: Post = {id: "", title: "", content: ""};

  constructor(private postsService: PostService,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {id: postData.post._id, title: postData.post.title, content: postData.post.content}
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSubmit(form: NgForm) {
    let newPost: Post = {id: "", title: form.value.title, content: form.value.content};
    if (this.mode === 'create') {
      this.postsService.createPost(newPost);
    } else if (this.mode === 'edit') {
      newPost = this.post
      this.postsService.updatePost(newPost);
    }
    form.resetForm();
  }

}
