import { IPost } from 'src/app/shared/interfaces';

export interface IPostsResponse {
  posts: IPost[];
  postCount: number;
}
