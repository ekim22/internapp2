import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Post} from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsChanged = new Subject<Post[]>();
  private posts: Post[] = []

  constructor(private httpClient: HttpClient) {}

  getPost(id: string | null) {
    return <Post>{...this.posts.find(p => p.id === id)};
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
          console.log(transformedPosts);
          this.posts = transformedPosts;
          this.postsChanged.next([...this.posts]);
        });
  }

  addPost(post: Post) {
    this.httpClient.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
          post.id = responseData.postId;
          this.posts.push(post);
          this.postsChanged.next([...this.posts])
        });
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
