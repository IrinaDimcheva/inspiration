import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable, of } from "rxjs";
import { tap, map } from 'rxjs/operators';

import { IUser } from "../../shared/interfaces";
import { UserService } from "../../user/user.service";

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private userService: UserService, private router: Router) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   return this.userService.isLogged === route.data['isAuth'];
  // }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean> {
    return this.userService.isLogged === childRoute.data['isAuth'];

    // if (this.userService.isLogged) {
    //   return true;
    // }

    // this.router.navigate(['user/login']);
    // return false;


    // let stream$: Observable<IUser | null>;
    // if (this.userService.user === undefined) {
    //   stream$ = this.userService.getUserProfile();
    // } else {
    //   stream$ = of(this.userService.user);
    // }

    // return stream$.pipe(
    //   map((user: IUser) => {
    //     const isAuthRoute = childRoute.data['isAuth'];
    //     return typeof isAuthRoute !== 'boolean' && isAuthRoute === !!user;
    //   }),
    //   tap((canContinue) => {
    //     if (canContinue) { return; }
    //     // this.router.navigate(['']);
    //     this.router.navigateByUrl(this.router.url);
    //   })
    // )
  }
}