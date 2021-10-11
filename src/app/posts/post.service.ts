import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Post} from './post.model';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsChanged = new Subject<Post[]>();
  private posts: Post[] = []

  constructor(private httpClient: HttpClient,
              private router: Router) {}

  getPost(postId: string | null) {
    return this.httpClient.get<{message: string, post: Post}>('http://localhost:3000/api/posts/' + postId);
  }

  getPosts() {
    this.httpClient
        .get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
          return postData.posts.map((post: Post) => {
            return {
              ...post,
              _id: post._id.toString(),
            };
          });
        }))
        .subscribe((transformedPosts) => {
          this.posts = transformedPosts;
          this.postsChanged.next([...this.posts]);
        });
  }

  createPost(post: Post, image: File) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', image, post.title);
    this.httpClient
      .post<{message: string, postId: string}>('http://localhost:3000/api/posts', postData)
      .subscribe((responseData) => {
        post._id = responseData.postId;
        this.posts.push(post);
        this.postsChanged.next([...this.posts])
        this.router.navigate(['/']);
      });
  }

  updatePost(post: Post) {
    const newPost: Post = {title: post.title, content: post.content, _id: post._id}
    this.httpClient.patch<{message: string}>('http://localhost:3000/api/posts/' + post._id, post)
      .subscribe((responseData) => {
        console.log(responseData)
        const oldPostIndex = this.posts.findIndex(p => p._id === post._id);
        this.posts[oldPostIndex] = newPost
        console.log(this.posts)
        this.postsChanged.next([...this.posts])
        this.router.navigate(['/']);

      })
  }

  deletePost(postId: string) {
    this.httpClient.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() => {
          this.posts = this.posts.filter(post => post._id !== postId);
          this.postsChanged.next([...this.posts]);
        });
  }

  getPostChangedListener() {
    return this.postsChanged.asObservable();
  }
}
