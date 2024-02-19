import { IPostsResponse } from './posts-response.interface';

export interface IPostsState {
  isLoading: boolean;
  error: string | null;
  data: IPostsResponse | null;
}
