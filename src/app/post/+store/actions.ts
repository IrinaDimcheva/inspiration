import { createActionGroup, props } from '@ngrx/store';
import { IPost } from 'src/app/shared/interfaces';
import { ICreatePost } from '../interfaces/create-post';

export const postActions = createActionGroup({
  source: 'post',
  events: {
    'Get post': props<{ postId: string }>(),
    'Get post success': props<{ post: IPost }>(),
    'Get post failure': props<{ message: string }>(),

    'Create post': props<{ post: ICreatePost }>(),
    'Create post success': props<{ post: IPost }>(),
    'Create post failure': props<{ message: string }>(),
  },
});
