import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {slideInOutAnimation} from './header-animations';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {LoginModalComponent} from '../../auth/login-modal/login-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSidenav} from '@angular/material/sidenav';
import {PharosProfileService} from '../../auth/pharos-profile.service';
import {HeaderOptionsService} from '../../pharos-services/header-options.service';
import {SelectedFacetService} from '../../pharos-main/data-list/filter-panel/selected-facet.service';
import {PathResolverService} from '../../pharos-main/data-list/filter-panel/path-resolver.service';
import {Facet} from '../../models/facet';
import {LocalStorageService} from '../../pharos-services/local-storage.service';


/**
 * Component that contains basic NCATS branded menu, also contains pharos options
 */
@Component({
  selector: 'app-ncats-header',
  templateUrl: './ncats-header.component.html',
  styleUrls: ['./ncats-header.component.scss'],
  animations: [slideInOutAnimation]
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
    private profileService: PharosProfileService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
  }

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
    } else if (this.route.snapshot.url && this.route.snapshot.url.length > 0) {
      return path === this.route.snapshot.url[0].path;
    } else {
      return false;
    }
  }

  gotoTutorial(tutorial: string) {
    if (tutorial === 'structure-search-tour') {
      const navigationExtras: NavigationExtras = {
        queryParamsHandling: '',
        queryParams: {
          tutorial
        },
      };
      this.router.navigate(['/structure'], navigationExtras);
    } else {
      let path = this.router.url.split('?')[0];
      if (path.startsWith('/')) {
        path = path.slice(1);
      }
      const onListPage = ['diseases', 'ligands', 'targets'].includes(path);
      if (!onListPage) {
        path = 'targets';
      }
      const navigationExtras: NavigationExtras = {
        queryParamsHandling: (onListPage ? 'merge' : ''),
        queryParams: {
          tutorial
        },
      };
      this.router.navigate([path], navigationExtras);
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
   * Shows the jira issue collector dialog
   */
  submitFeedback(event) {
    event.preventDefault();
    const w = (window as any);
    // w.ATL_JQ_PAGE_PROPS.fieldValues = w.ATL_JQ_PAGE_PROPS.fieldValues || {};
    // w.ATL_JQ_PAGE_PROPS.fieldValues.description = 'something by default';
    w.showCollectorDialog();
  }

  tutorialComplete(tutorial: string) {
    return this.localStorage.store.getItem(tutorial) === 'complete';
  }

  /**
   * sign out user
   */
  signOut(): void {
    this.profileService.logout();
  }
}
