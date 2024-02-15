import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IUser } from '../../shared/interfaces';
import { selectUser } from 'src/app/user/+store/reducers';

@Injectable()
export class AuthGuard {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const stream$: Observable<IUser | null> = this.store.select(selectUser);

    return stream$.pipe(
      map((user: IUser) => {
        const isAuthRoute = route.data['isLogged'];
        return typeof isAuthRoute !== 'boolean' || isAuthRoute === !!user;
      }),
      tap((canContinue) => {
        if (canContinue) {
          return;
        }
        this.router.navigateByUrl('/user/login');
      })
    );
  }
}
