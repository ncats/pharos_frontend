import {AfterContentInit, AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {NavSectionsService} from './services/nav-sections.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PanelOptions} from '../../pharos-main/pharos-main.component';
import {PharosPanel} from '../../../config/components-config';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DOCUMENT, Location, ViewportScroller} from '@angular/common';

/**
 * panel that lists available sections of the details page, with jump to section navigation
 */
@Component({
  selector: 'pharos-sidenav-panel',
  templateUrl: './sidenav-panel.component.html',
  styleUrls: ['./sidenav-panel.component.scss']
})
export class SidenavPanelComponent implements OnInit, AfterContentInit {
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
    private _route: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private location: Location,
    private viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private document: Document,
    public navSectionsService: NavSectionsService) {
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
    this.navSectionsService.setSections(this._route.snapshot.data.components
      .filter(component => component.navHeader || (component.panels && component.panels.length > 0)));

    this.navSectionsService.sections$.subscribe(res => {
      if (res && res.length) {
        this.sections = res;
        this.activeElement = this.activeFragment;
        if (this.activeElement) {
          this.viewportScroller.scrollToAnchor(this.activeElement);
        }
      }
    });

    this.navSectionsService.activeSection$.subscribe(res => {
      if (res) {
        this.activeElement = res;
      }
    });

    // this covers url change when navigation/click to go to section
    this._route.fragment.subscribe(fragment => {
      this.activeElement = fragment;
      this.viewportScroller.scrollToAnchor(fragment);
    });


    this.router.events
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
}
