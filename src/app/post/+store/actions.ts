import { createActionGroup, props } from '@ngrx/store';
import { IPost } from 'src/app/shared/interfaces';

export const postActions = createActionGroup({
  source: 'post',
  events: {
    'Get post': props<{ postId: string }>(),
    'Get post success': props<{ post: IPost }>(),
    'Get post failure': props<{ message: string }>(),
  },
});
