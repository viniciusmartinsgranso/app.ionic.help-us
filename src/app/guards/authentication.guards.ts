//#region Imports

import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from "../services/user/user.service";

//#endregion

@Injectable({
  providedIn: 'root',
})
export class AuthenticateGuard implements CanActivate {
  private readonly router: Router = inject(Router);

  private readonly userService: UserService = inject(UserService);

  public async canActivate(
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot,
  ): Promise<boolean> {
    const { unprotectedRoute, protectedRoute } = route.data || {};

    let { routeToRedirect } = route.data || {};

    if (!routeToRedirect) return true;

    const hasToken = await this.userService.isLogged();

    if (hasToken && protectedRoute) return true;

    if (!hasToken && unprotectedRoute) return true;

    return await this.router
      .navigate([routeToRedirect], { replaceUrl: true })
      .then(() => false);
  }
}
