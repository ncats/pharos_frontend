import {
  AfterContentInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID
} from '@angular/core';
import {NavSectionsService} from './services/nav-sections.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PanelOptions} from '../../pharos-main/pharos-main.component';
import {PharosPanel} from '../../../config/components-config';
import {BreakpointObserver} from '@angular/cdk/layout';
import {CommonModule, DOCUMENT, isPlatformServer, Location, ViewportScroller} from '@angular/common';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CentralStorageService} from '../../pharos-services/central-storage.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatTooltip} from '@angular/material/tooltip';

/**
 * panel that lists available sections of the details page, with jump to section navigation
 */
@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatNavList, MatTooltip, MatListItem],
  selector: 'pharos-sidenav-panel',
  templateUrl: './sidenav-panel.component.html',
  styleUrls: ['./sidenav-panel.component.scss']
})
export class SidenavPanelComponent implements OnInit, AfterContentInit, OnDestroy {
  protected ngUnsubscribe: Subject<any> = new Subject();
  /**
   * close the filter panel
   * @type {EventEmitter<boolean>}
   */
  @Output() menuToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * page section currently in view
   */
  @Input() activeElement: string;

  activeFragment: string;
  /**
   * list of all available sections
   * @type {any[]}
   */
  @Input() sections: PharosPanel[] = [];

  /**
   * boolean to toggle mobile views and parameters
   * @type {boolean}
   */
  isSmallScreen = false;

  visibleCommunityAPIs: any[] = [];

  getAPIs(section: string) {
    return this.visibleCommunityAPIs.filter(api => api.related_section === section);
  }

  panelOptions: PanelOptions = {
    mode: 'side',
    class: 'filters-panel',
    opened: true,
    fixedInViewport: true,
    fixedTopGap: 120,
    role: 'directory'
  };

  /**
   * get router to navigate
   * @param {Router} router
   * @param _route
   * @param breakpointObserver
   * @param location
   * @param viewportScroller
   * @param {NavSectionsService} navSectionsService
   */
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformID: any,
    private _route: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private location: Location,
    private viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private document: Document,
    public navSectionsService: NavSectionsService,
    private centralStorageService: CentralStorageService) {
    this.viewportScroller.setOffset([0, 120]);
  }

  /**
   * subscribe to available sections and set first one as active,
   * change active element on scroll change
   */
  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    if (this.isSmallScreen) {
      this.panelOptions.opened = false;
      this.panelOptions.mode = 'over';
    }
    this.centralStorageService.visibleCommunityAPIsChanged.subscribe(visibleAPIs => {
      this.visibleCommunityAPIs = visibleAPIs;
    })
    this.navSectionsService.sections$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        if (res && res.length) {
          this.sections = res;
          this.activeElement = this.activeFragment;
          if (this.activeElement) {
            this.viewportScroller.scrollToAnchor(this.activeElement);
          }
        }
      });

    this.navSectionsService.activeSection$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        if (res) {
          this.activeElement = res;
        }
      });

    this.navSectionsService.setSections(this._route.snapshot.data.components
      .filter(component => !component.externalComponent && (component.navHeader || (component.panels && component.panels.length > 0))));

    // this covers url change when navigation/click to go to section
    this._route.fragment
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(fragment => {
      this.activeElement = fragment;
      this.viewportScroller.scrollToAnchor(fragment);
    });


    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.activeFragment = '';
          this.activeElement = '';
        }
      });
  }

  /**
   * close the filter panel
   */
  toggleMenu() {
    this.menuToggle.emit();
  }

  /**
   * jump to section on click
   * @param fragment
   */
  public scroll(fragment: any): void {
    this.activeElement = fragment;
    this.activeFragment = fragment;
    this.location.replaceState(`${this.location.path(false)}#${fragment}`);
    this.viewportScroller.scrollToAnchor(fragment);
  }

  /**
   * check of section header is the active one
   * @param {string} check
   * @returns {boolean}
   */
  isActive(check: string): boolean {
    return this.activeElement === check;
  }

  ngAfterContentInit() {
    if (this._route.snapshot.fragment) {
      this.activeFragment = this._route.snapshot.fragment;
      this.viewportScroller.scrollToAnchor(this.activeElement);
    }
  }

  pending(section: any, isAPI = false){
    return isPlatformServer(this.platformID) && (section.browserOnly || isAPI);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
