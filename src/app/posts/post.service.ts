import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Post} from "./post.model";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private postsChanged = new Subject<Post[]>();
  private posts: Post[] = [
    // {title: 'First Post', content: 'This is first content'},
    // {title: 'Second Post', content: 'This is second content'},
    // {title: 'Third Post', content: 'This is third content'},
  ]

  constructor(private httpClient: HttpClient) {
  }

  getPosts() {
    this.httpClient
      .get<{message: string, posts: any}>("http://localhost:3000/api/posts")
      .pipe(map((postData) => {
        return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id.toString()
          }
        })
      }))
      .subscribe((transformedPosts) => {
        console.log(transformedPosts)
        this.posts = transformedPosts;
        this.postsChanged.next([...this.posts])
    });
  }

  addPost(post: Post) {
    this.httpClient.post<{message: string}>("http://localhost:3000/api/posts", post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsChanged.next([...this.posts]);
      })
  }

  getPostChangedListener() {
    return this.postsChanged.asObservable();
  }


}
