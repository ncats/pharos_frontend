import {Component, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NcatsHeaderComponent} from './tools/ncats-header/ncats-header.component';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {LoadingService} from './pharos-services/loading.service';
import {Title} from '@angular/platform-browser';
import {TourService} from './pharos-services/tour.service';
import {SwUpdate} from '@angular/service-worker';
import {interval, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {JsonldService} from './pharos-services/jsonld.service';
import {UseCaseData} from './use-cases/use-case-data';
import {CentralStorageService} from './pharos-services/central-storage.service';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './tools/alert/alert.component';
import {PharosLoadingSpinnerComponent} from './tools/pharos-loading-spinner/pharos-loading-spinner.component';
import {ScrollToTopComponent} from './tools/scroll-to-top/scroll-to-top.component';
import {PharosFooterComponent} from './tools/pharos-footer/pharos-footer.component';

/**
 * main app component holder
 */
@Component({
  standalone: true,
  imports: [CommonModule, NcatsHeaderComponent, AlertComponent, PharosLoadingSpinnerComponent, RouterOutlet,
    ScrollToTopComponent, PharosFooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<any> = new Subject();
  /**
   * reference to header oject. used to change display options
   */
  @ViewChild('appHeader', {static: true}) header: NcatsHeaderComponent;

  /**
   * is component loading or not
   */
  @Input() loading = true;

  /**
   * get navigation router
   * @param router
   * @param loadingService
   */
  constructor(
    private swUpdate: SwUpdate,
    private router: Router,
    private loadingService: LoadingService,
    private titleService: Title,
    private tourService: TourService,
    private _route: ActivatedRoute,
    private jsonldService: JsonldService,
    private centralStorageService: CentralStorageService
  ) {
  }

  /**
   * toggle loading component based on navigation change
   */
  ngOnInit() {
    this.jsonldService.insertSchema(this.jsonldService.orgSchema(), 'structured-data-website');
    this.loadingService.loading$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => this.loading = res);

    // check for platform update
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
      interval(300000)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          this.swUpdate.checkForUpdate();
        });
      this.swUpdate.versionUpdates
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(event => {
          if (event.type === 'VERSION_READY') {
            console.log('A newer version of Pharos is available!');
            this.swUpdate.activateUpdate();
            location.reload();
          }
        });
    }

    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        if (e instanceof NavigationStart) {
          this.loading = true;
          this.jsonldService.removeStructuredData();
        }
        if (e instanceof NavigationEnd) {
          const titles = this.getTitle(this.router.routerState, this.router.routerState.root);
          const title = 'Pharos : ' + (titles.length > 0 ? titles[0] : 'Illuminating the Druggable Genome');
          this.titleService.setTitle(title);
          this.centralStorageService.clearVisibleCommunityAPIs();
          this.loading = false;
          this.runTutorial();
        }
      });
  }

  /**
   * listener to resize the chart on page resize
   */
  @HostListener('window:resize', [])
  onResize() {
    this.tourService.setSizeCutoffs();
  }

  runTutorial() {
    const tutorial = this._route.snapshot.queryParamMap.get('tutorial');
    this.tourService.runTutorial(tutorial);
  }

  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      const path = parent.snapshot.url?.length > 1 ? parent.snapshot.url[0].path : '';
      const subpath = parent.snapshot.url?.length > 1 ? parent.snapshot.url[1].path : '';
      let title = parent.snapshot.data.title;
      if (subpath) {
        if (path === 'usecases') {
          const selectedCase = UseCaseData.getUseCases().find(c => c.anchor === subpath);
          title = title + ' - ' + selectedCase.title;
        } else {
          title = title + ' - ' + subpath;
        }
      }
      data.push(title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data.sort((a, b) => b.length - a.length);
  }

  /**
   * close sidenav for header menu
   */
  closeSidenav() {
    this.header.sidenav.close();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
