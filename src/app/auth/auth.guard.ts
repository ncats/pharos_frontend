import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {PharosProfileService} from './pharos-profile.service';
import {map, take} from 'rxjs/internal/operators';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {LoadingService} from '../pharos-services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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
            const signin = this.dialog.open(LoginModalComponent, {
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
