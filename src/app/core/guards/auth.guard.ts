import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { IUser } from '../../shared/interfaces';
import { UserService } from '../../user/services/user.service';
import { Store, select } from '@ngrx/store';
import { selectErrors, selectUser } from 'src/app/user/+store/reducers';

@Injectable()
export class AuthGuard {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let stream$: Observable<IUser | null> = this.store.select(selectUser);
    //  if (this.store.select(selectUser) === undefined) {
    //     // stream$ = this.userService.getUserProfile();
    //     stream$ = this.store.select(selectUser);
    //   } else {
    //     stream$ = this.store.select(selectUser);
    //   }

    return stream$.pipe(
      map((user: IUser) => {
        const isAuthRoute = route.data['isLogged'];
        return typeof isAuthRoute !== 'boolean' || isAuthRoute === !!user;
      }),
      tap((canContinue) => {
        if (canContinue) {
          return;
        }
        this.router.navigate(['']);
        // this.router.navigateByUrl(this.router.url);
      })
    );
  }
}
