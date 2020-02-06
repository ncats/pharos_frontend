import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NcatsHeaderComponent} from './tools/ncats-header/ncats-header.component';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {LoadingService} from './pharos-services/loading.service';

const APP_COMPONENT_SERVICE = {
  createListeners: [],
  destroyListeners: [],
  onContainerCreated(fn) {
    this.createListeners.push(fn);
  },
  onContainerDestroyed(fn) {
    this.destroyListeners.push(fn);
  },
  registerContainer(container) {
    this.createListeners.forEach((fn) => {
      fn(container);
    });
  },
  destroyContainer(container) {
    this.destroyListeners.forEach((fn) => {
      fn(container);
    });
  }
};


/**
 * main app component holder
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: 'AppComponentService',
      useValue: APP_COMPONENT_SERVICE
    }
  ],
})
export class AppComponent implements OnInit {

  /**
   * reference to header oject. used to change display options
   */
  @ViewChild('appHeader', {static: true}) header: NcatsHeaderComponent;

  /**
   * is component loading or not
   */
  @Input()loading = true;

  /**
   * get navigation router
   * @param router
   */
  constructor(
    private router: Router,
    private loadingService: LoadingService,
  ) {}

  /**
   * toggle loading component based on navigation change
   */
  ngOnInit() {
    this.loadingService.loading$.subscribe(res => this.loading = res);
    this.router.events
      .subscribe((e: any) => {
        if (e instanceof NavigationStart) {
          this.loading = true;
        }
        if (e instanceof NavigationEnd) {
          this.loading = false;
        }
      });
  }

  /**
   * close sidenav for header menu
   */
  closeSidenav() {
    this.header.sidenav.close();
  }
}
