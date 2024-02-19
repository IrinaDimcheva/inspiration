import { createActionGroup, props } from '@ngrx/store';
import { IPostsResponse } from '../interfaces/posts-response.interface';

export const postActions = createActionGroup({
  source: 'posts',
  events: {
    'Get posts': props<{
      limit: number;
      page: number;
      title: string;
    }>(),
    'Get posts success': props<{ posts: IPostsResponse }>(),
    'Get posts failure': props<{ message: string }>(),
  },
});
