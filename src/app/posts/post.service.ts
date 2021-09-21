import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Post} from "./post.model";



@Injectable({
  providedIn: "root"
})
export class PostService {
  postsChanged = new Subject<Post[]>();
  posts: Post[] = [
    // {title: 'First Post', content: 'This is content'},
    // {title: 'Second Post', content: 'This is content'},
    // {title: 'Third Post', content: 'This is content'},
  ]

  getPosts() {
    return this.posts.slice();
  }

  addPost(post: Post) {
    this.posts.push(post);
    this.postsChanged.next(this.posts);
  }


}
