import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NcatsHeaderComponent} from './tools/ncats-header/ncats-header.component';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {LoadingService} from './pharos-services/loading.service';
import {Title} from "@angular/platform-browser";

/**
 * main app component holder
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
   * @param loadingService
   */
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private titleService: Title
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
          var titles = this.getTitle(this.router.routerState, this.router.routerState.root);
          const title = "Pharos : " + (titles.length > 0 ? titles[0] : 'Illuminating the Druggable Genome');
          this.titleService.setTitle(title);
          this.loading = false;
        }
      });
  }

  getTitle(state, parent) {
    var data = [];
    const url = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      const subpath = parent.snapshot.url?.length > 1 ? parent.snapshot.url[1].path : '';
      let title = parent.snapshot.data.title;
      if(subpath) {
        title = title + ' - ' + subpath;
      }
      data.push(title);
    }

    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data.sort((a, b) => b.length - a.length);
  }

  /**
   * close sidenav for header menu
   */
  closeSidenav() {
    this.header.sidenav.close();
  }
}
