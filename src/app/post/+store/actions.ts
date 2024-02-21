import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IPost } from 'src/app/shared/interfaces';
import { IPostRequest } from '../interfaces/post-request';

export const postActions = createActionGroup({
  source: 'post',
  events: {
    'Get post': props<{ postId: string }>(),
    'Get post success': props<{ post: IPost }>(),
    'Get post failure': props<{ message: string }>(),

    'Create post': props<{ post: IPostRequest }>(),
    'Create post success': props<{ post: IPost }>(),
    'Create post failure': props<{ message: string }>(),

    'Update post': props<{ request: IPostRequest; postId: string }>(),
    'Update post success': props<{ post: IPost }>(),
    'Update post failure': props<{ message: string }>(),

    'Delete post': props<{ postId: string }>(),
    'Delete post success': emptyProps(),
    'Delete post failure': emptyProps(),
  },
});
