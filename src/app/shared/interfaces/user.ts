import { IComment } from './comment';
import { IPost } from './post';

export interface IUser {
  favorites: string[];
  posts: IPost[];
  comments: IComment[];
  _id: string;
  email: string;
  username: string;
  password: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}
