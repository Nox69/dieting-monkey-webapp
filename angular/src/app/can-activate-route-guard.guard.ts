import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "./authentication.service";
import { RouterService } from "./router.service";
@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(
    private _authService: AuthenticationService,
    private routeService: RouterService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this._authService.getBearerToken() != null &&
      this._authService.getBearerToken() != ""
      ? true
      : false;
  }
}
