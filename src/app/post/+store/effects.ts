import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postActions } from './actions';
import { IPost } from 'src/app/shared/interfaces';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

export const getPostEffect = createEffect(
  (actions$ = inject(Actions), postService = inject(PostService)) => {
    return actions$.pipe(
      ofType(postActions.getPost),
      switchMap(({ postId }) => {
        return postService.loadPostById(postId).pipe(
          tap(console.log),
          map((post: IPost) => {
            return postActions.getPostSuccess({ post });
          }),
          tap(console.log),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              postActions.getPostFailure({
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

export const createPostEffect = createEffect(
  (actions$ = inject(Actions), postService = inject(PostService)) => {
    return actions$.pipe(
      ofType(postActions.createPost),
      switchMap(({ post }) => {
        return postService.addPost(post).pipe(
          map((post: IPost) => {
            return postActions.createPostSuccess({ post });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              postActions.createPostFailure({
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

export const redirectAfterCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(postActions.createPostSuccess),
      tap(() => {
        router.navigate(['/posts']);
      })
    );
  },
  { functional: true, dispatch: false }
);
