import {Component, OnInit} from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../post.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {mimeType} from "./mime-type.validator";
import {Subscription} from "rxjs";

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
  public post: Post = {_id: "", title: "", content: "", imagePath: ""};
  public isLoading = false;
  public isLoadingListener = new Subscription();

  constructor(private postsService: PostService,
              public route: ActivatedRoute,
              public router: Router) { }

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
          this.post = {
            _id: postData.post._id,
            title: postData.post.title,
            content: postData.post.content,
            imagePath: postData.post.imagePath
          }
          this.imagePreview = <string>postData.post.imagePath;
          setTimeout(() => {
            this.isLoading = false;
          }, 500)
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          })
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
    this.isLoadingListener = this.postsService.postIsLoading.subscribe(
      postIsLoading => {
        this.isLoading = postIsLoading;
      }
    )
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
    if (this.mode === 'create') {
      this.post = {_id: "", title: this.form.value.title, content: this.form.value.content, imagePath: ""}
      this.postsService.createPost(this.post, this.form.value.image);
    } else if (this.mode === 'edit') {
      let editedPost = {
        ...this.post,
        title: this.form.value.title,
        content: this.form.value.content,
        imagePath: this.form.value.image
      }
      this.postsService.updatePost(editedPost);
    }
    this.form.reset();
  }

  onCancel() {
    this.router.navigate(['/posts'])
  }

}
