import { IUser } from "./user";

export interface IPost {
  favorites: string[];
  likes: string[];
  comments: string[];
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  userId: IUser;
  created_at: string;
  updatedAt: string;
  __v: number;
}
