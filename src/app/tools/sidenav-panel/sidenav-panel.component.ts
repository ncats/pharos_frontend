import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {NavSectionsService} from './services/nav-sections.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';

/**
 * panel that lists available sections of the details page, with jump to section navigation
 */
@Component({
  selector: 'pharos-sidenav-panel',
  templateUrl: './sidenav-panel.component.html',
  styleUrls: ['./sidenav-panel.component.scss']
})
export class SidenavPanelComponent implements OnInit {

  /**
   * close the filter panel
   * @type {EventEmitter<boolean>}
   */
  @Output() closeClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * page section currently in view
   */
  @Input() activeElement: string;

  /**
   * list of all available sections
   * @type {any[]}
   */
  sections: any[] = [];

  /**
   * get router to navigate
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {NavSectionsService} navSectionsService
   */
  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private navSectionsService: NavSectionsService) {
  }

  /**
   * subscribe to available sections and set first one as active,
   * change active element on scroll change
   */
  ngOnInit() {
    this.navSectionsService.sections$.subscribe(res => {
      if (res && res.length) {
        this.sections = res;
        this.activeElement = this.sections[0].section;
      }
    });

    this.navSectionsService.activeSection$.subscribe(res => {
      if (res) {
        this.activeElement = res;
      }
    });

    // this covers url change when navigation/click to go to section
    this.route.fragment.subscribe(fragment => {
      this.activeElement = fragment;
    });
  }

  /**
   * close the filter panel
   */
  closeMenu() {
    this.closeClick.emit();
  }

  /**
   * jump to section on click
   * @param fragment
   */
  public scroll(fragment: any): void {
    const navigationExtras: NavigationExtras = {
      fragment: fragment
    };
    this.router.navigate([], navigationExtras);
  }

  /**
   * check of section header is the active one
   * @param {string} check
   * @returns {boolean}
   */
  isActive(check: string): boolean {
    return this.activeElement === check;
  }
}
