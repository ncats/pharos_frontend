import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SlideInOutAnimation} from './header-animations';
import {ActivatedRoute, Route} from '@angular/router';
import {LoginModalComponent} from '../../auth/login-modal/login-modal.component';
import {MatDialog, MatSidenav} from '@angular/material';
import {PharosAuthService} from '../../auth/pharos-auth.service';
import * as firebase from 'firebase/app';
import {PharosProfileService} from '../../auth/pharos-profile.service';
import {HeaderOptionsService} from '../../pharos-services/header-options.service';


/**
 * Component that contains basic NCATS branded menu, also contains pharos options
 */
@Component({
  selector: 'app-ncats-header',
  templateUrl: './ncats-header.component.html',
  styleUrls: ['./ncats-header.component.scss'],
  animations: [SlideInOutAnimation]
})
export class NcatsHeaderComponent implements OnInit {

  /**
   * sidenav instance for mobile navigation menu
   */
  @ViewChild('mobilesidenav', {static: true}) sidenav: MatSidenav;
  /**
   * show search bar
   */
  @Input() searchBar?: boolean;

  /**
   * profile object
   * todo: create type object and see if useer and profile can be merged
   */
  profile: any;

  /**
   * animation state changed by scrolling
   * @type {string}
   */
  @Input() animationState = 'out';

  /**
   * constructor initialization
   * @param dialog
   * @param route
   * @param headerOptionsService
   * @param profileService
   */
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private headerOptionsService: HeaderOptionsService,
    private profileService: PharosProfileService
    ) { }

  /**
   * subscribe to profile and header options services
   */
  ngOnInit() {
    this.profileService.profile$.subscribe(profile => {
      this.profile = profile && profile.data() ? profile.data() : profile;
    });

    this.headerOptionsService.headerOptions$.subscribe(res => {
      Object.entries(res).forEach((prop) => this[prop[0]] = prop[1]);
    });
  }

  /**
   * sets active section in nav
   * @param path
   */
  isActive(path: string): boolean {
    if (this.route.snapshot.data && this.route.snapshot.data.path) {
      return path === this.route.snapshot.data.path;
    } else if (this.route.snapshot.url && this.route.snapshot.url.length > 0 ) {
      return path === this.route.snapshot.url[0].path;
    } else {
      return false;
    }
  }

  /**
   * opens modal for user to sign in
   */
  openSignInModal() {
    this.dialog.open(LoginModalComponent, {
        height: '75vh',
        width: '66vw',
      }
    );
  }

  /**
   * sign out user
   */
  signOut(): void {
    this.profileService.logout();
  }
}
