import { IPost } from 'src/app/shared/interfaces';
import { IPostsResponse } from './posts-response.interface';

export interface IPostState {
  isLoading: boolean;
  error: string | null;
  data: IPostsResponse | null;
  post: IPost | null;
}
