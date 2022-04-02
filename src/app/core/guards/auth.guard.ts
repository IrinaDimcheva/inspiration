import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/user/user.service";

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private userService: UserService, private router: Router) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthRoute = childRoute.data['isAuth'];
    if (typeof isAuthRoute === 'boolean' && isAuthRoute === this.userService.isLogged) {
      console.log(childRoute.data);
      return true;
    }
    // this.router.navigate(['']);
    this.router.navigateByUrl(this.router.url);
    return false;
  }
}