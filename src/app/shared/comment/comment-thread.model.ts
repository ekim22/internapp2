import {Profile} from "../../user/profile/profile-model";

export interface CommentThread {
  _id: string;
  appId: string;
  threadAuthor: string;
  threadSubject: string;
  comments: Array<{
    comment: string,
    commentAuthor: string,
    commentEmail: string,
    profile: Profile
  }>;
}
