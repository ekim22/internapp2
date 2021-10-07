import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
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
    return this.httpClient.get<{message: string, post: {_id: string, title: string, content: string}}>('http://localhost:3000/api/posts/' + postId);
  }

  getPosts() {
    this.httpClient
        .get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
          return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id.toString(),
            };
          });
        }))
        .subscribe((transformedPosts) => {
          this.posts = transformedPosts;
          this.postsChanged.next([...this.posts]);
        });
  }

  createPost(post: Post) {
    this.httpClient.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
          post.id = responseData.postId;
          this.posts.push(post);
          this.postsChanged.next([...this.posts])
          this.router.navigate(['/']);
        });
  }

  updatePost(post: Post) {
    const newPost: Post = {title: post.title, content: post.content, id: post.id}
    this.httpClient.patch<{message: string}>('http://localhost:3000/api/posts/' + post.id, post)
      .subscribe((responseData) => {
        console.log(responseData)
        const oldPostIndex = this.posts.findIndex(p => p.id === post.id);
        this.posts[oldPostIndex] = newPost
        console.log(this.posts)
        this.postsChanged.next([...this.posts])
        this.router.navigate(['/']);

      })
  }

  deletePost(postId: string) {
    this.httpClient.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() => {
          this.posts = this.posts.filter(post => post.id !== postId);
          this.postsChanged.next([...this.posts]);
        });
  }

  getPostChangedListener() {
    return this.postsChanged.asObservable();
  }
}
