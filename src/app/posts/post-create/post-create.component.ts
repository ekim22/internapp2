import {Component, OnInit} from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../post.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {mimeType} from "./mime-type.validator";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  form!: FormGroup;
  imagePreview!: string | ArrayBuffer | null;
  private mode = 'create';
  private postId!: string | null;
  public post: Post = {id: "", title: "", content: ""};
  public isLoading = false;

  constructor(private postsService: PostService,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      content: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {id: postData.post._id, title: postData.post.title, content: postData.post.content}
          setTimeout(() => {
            this.isLoading = false;
          }, 500)
          this.form.setValue({title: this.post.title, content: this.post.content, image: null})
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    let newPost: Post = {id: "", title: this.form.value.title, content: this.form.value.content};
    if (this.mode === 'create') {
      this.postsService.createPost(newPost, this.form.value.image);
    } else if (this.mode === 'edit') {
      newPost = this.post
      this.postsService.updatePost(newPost);
    }
    this.form.reset();
  }

}
