import { IPost } from "./post";
import { IUser } from "./user";

export interface IComment {
  likes: string[];
  _id: string;
  text: string;
  userId: IUser;
  postId: IPost;
  created_at: string;
  updatedAt: string;
  __v: number;
}