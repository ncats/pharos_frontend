import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, map} from 'rxjs';
import {PharosProfileService} from './pharos-profile.service';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {LoadingService} from '../pharos-services/loading.service';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private dialog: MatDialog,
    private pharosProfileService: PharosProfileService,
    private loadingService: LoadingService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> {
    return this.pharosProfileService.isLoggedIn
      .pipe(
        map( res => {
          if (res) {
            return true;
            //  return of(true);
          } else {
            this.loadingService.toggleVisible(false);
            this.dialog.open(LoginModalComponent, {
                height: '75vh',
                width: '66vw',
              }
            );
            this.router.navigate(['/']);
            return false;
          }
        })
      )
      ;
  }
}
