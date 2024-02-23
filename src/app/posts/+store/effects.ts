import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../services/posts.service';
import { postActions } from './actions';
import { IPostsResponse } from '../interfaces/posts-response.interface';

export const getPostsEffect = createEffect(
  (actions$ = inject(Actions), postService = inject(PostsService)) => {
    return actions$.pipe(
      ofType(postActions.getPosts),
      switchMap(({ limit, page, title }) => {
        return postService.getPosts(limit, page, title).pipe(
          map((posts: IPostsResponse) => {
            return postActions.getPostsSuccess({ posts });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              postActions.getPostsFailure({
                message: errorResponse.error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);