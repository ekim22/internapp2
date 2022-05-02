import {Injectable, InjectionToken, Injector} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {
  Overlay,
  OverlayRef,
} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {CommentComponent} from "./comment.component";
import {Subject} from "rxjs";
import {CommentThread} from "./comment-thread.model";
import {map} from "rxjs/operators";
import {ProfileService} from "../../user/profile/profile.service";
import {Profile} from "../../user/profile/profile-model";

export const DATA_TOKEN = new InjectionToken('commentThreadData');

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  overlayRef!: OverlayRef | null;
  private commentThreads!: CommentThread[];
  private commentsChanged = new Subject<CommentThread[]>();
  private appId: string = 'student';

  constructor(private overlay: Overlay,
              private httpClient: HttpClient,
              private profileService: ProfileService) { }


  open(isComment: boolean, threadId?: string) {
    const portalInjector = Injector.create({
      providers: [{ provide: DATA_TOKEN, useValue: {isComment: isComment, threadId: threadId }}],
    })
    this.overlayRef = this.overlay.create();
    const componentPortal = new ComponentPortal(CommentComponent,
      null,
      portalInjector);
    this.overlayRef.attach(componentPortal);
  }

  close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  createCommentThread(subject: string, body: string) {
    const newCommentThread = {
      appId: this.appId,
      subject: subject,
      body: body,
    }
    this.httpClient.post<{message: string, commentThread: CommentThread}>( environment.apiUrl + 'comments', newCommentThread).subscribe((res) => {
      console.log('creating comment thread..', res.commentThread)
      this.profileService.userProfile.subscribe(profile => {
        const newCommentThread = {
          ...res.commentThread,
          comments: [
            {
              ...res.commentThread.comments[0],
              commentEmail: profile.email,
              profile: profile,
            }
          ]
        }
        console.log('new comment thread...', newCommentThread)
        this.commentThreads.push(newCommentThread);
        this.commentsChanged.next(this.commentThreads);
      })
      this.close();
    })
  }

  getCommentThreads() {
    this.httpClient.get<{commentThreads: CommentThread[]}>( environment.apiUrl + 'comments/' + this.appId)
      .pipe(map((res) => { return [
        ...res.commentThreads
      ] })).subscribe((commentThreads) => {
      this.commentThreads = commentThreads;
      this.commentsChanged.next(commentThreads)
    })
  }

  deleteCommentThread(threadId: string) {
    this.httpClient.delete<{message: string}>(environment.apiUrl + 'comments/' + threadId).subscribe((res) => {
      console.log(res.message);
      this.commentThreads = this.commentThreads.filter(el => el._id != threadId);
      this.commentsChanged.next(this.commentThreads)
    })
  }

  addComment(threadId: string, body: string) {
    const commentThread = {
      threadId: threadId,
      body: body,
    }
    this.httpClient.post<{message: string, comment: {
        comment: string,
        commentAuthor: string,
        profile: Profile
      }}>( environment.apiUrl + 'comments/new-comment', commentThread).subscribe((res) => {
      console.log(res);
      let ct = this.commentThreads.find(el => el._id === threadId);
      this.profileService.userProfile.subscribe(profile => {
        ct?.comments.push({
          comment: body,
          commentAuthor: profile.name,
          commentEmail: profile.email,
          profile: profile,
        })
      })
      this.commentsChanged.next(this.commentThreads)
      this.close();
    })
  }

  setAppId(studentId: string | null) {
    if (studentId) {
      this.appId = studentId;
    }
  }

  getCommentThreadsChanged() {
    return this.commentsChanged.asObservable();
  }
}
