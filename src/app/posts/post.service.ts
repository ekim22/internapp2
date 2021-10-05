import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Post} from "./post.model";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private postsChanged = new Subject<Post[]>();
  private posts: Post[] = [
    {title: 'First Post', content: 'This is first content'},
    {title: 'Second Post', content: 'This is second content'},
    {title: 'Third Post', content: 'This is third content'},
  ]

  getPosts() {
    return [...this.posts];
  }

  addPost(post: Post) {
    this.posts.push(post);
    this.postsChanged.next([...this.posts]);
  }

  getPostChangedListener() {
    return this.postsChanged.asObservable();
  }


}
