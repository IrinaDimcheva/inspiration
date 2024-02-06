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
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let stream$: Observable<IUser | null>;
    if (this.userService.user === undefined) {
      stream$ = this.userService.getUserProfile();
    } else {
      stream$ = of(this.userService.user);
    }

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
