import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { UserService } from '../services/user.service';
import { authActions } from './actions';
import { IUser } from '../../shared/interfaces';

export const registerEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return userService.register(request).pipe(
          map((user: IUser) => {
            return authActions.registerSuccess({ user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
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

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const loginEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return userService.login(request).pipe(
          map((user: IUser) => {
            return authActions.loginSuccess({ user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({ message: errorResponse.error.message })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterLoginRequest = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const getUser = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(authActions.getUser),
      switchMap(() => {
        return userService.getUser().pipe(
          map((user: IUser) => {
            return authActions.getUserSuccess({ user });
          }),
          catchError(() => {
            return of(authActions.getUserFailure);
          })
        );
      })
    );
  },
  { functional: true }
);
