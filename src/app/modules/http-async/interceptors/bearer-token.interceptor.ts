import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromPromise } from "rxjs/internal/observable/innerFrom";
import { mergeMap } from "rxjs/operators";
import { UserService } from "../../../services/user.service";

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
  private readonly userService: UserService = inject(UserService);

  public static readonly DISABLE_HEADER: string = 'X-Disabled-BearerToken';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.get(BearerTokenInterceptor.DISABLE_HEADER)) {
      return fromPromise(this.userService.getUserToken()).pipe(
        mergeMap((result) => {
          if (!result) return next.handle(req);

          const headers = req.headers.set('Authorization', 'Bearer ' + result.token);

          req = req.clone({
            headers,
          });

          return next.handle(req);
        }),
      );
    }

    req = req.clone({
      headers: req.headers.delete(BearerTokenInterceptor.DISABLE_HEADER),
    });

    return next.handle(req);
  }
}
