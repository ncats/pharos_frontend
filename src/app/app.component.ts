import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {NcatsHeaderComponent} from './tools/ncats-header/ncats-header.component';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {LoadingService} from './pharos-services/loading.service';
import {Title} from '@angular/platform-browser';
import {TourType, TourService} from './pharos-services/tour.service';
import {SwUpdate} from '@angular/service-worker';
import {interval} from 'rxjs';

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
  ) {
  }

  /**
   * toggle loading component based on navigation change
   */
  ngOnInit() {
    this.loadingService.loading$.subscribe(res => this.loading = res);

    // check for platform update
    if (this.swUpdate.isEnabled) {
      interval(30000).subscribe(() => {
        this.swUpdate.checkForUpdate();
      });
      this.swUpdate.available.subscribe(() => {
        console.log('A newer version of Pharos is available!');
        this.swUpdate.activateUpdate();
        location.reload();
      });
    }

    this.router.events
      .subscribe((e: any) => {
        if (e instanceof NavigationStart) {
          this.loading = true;
        }
        if (e instanceof NavigationEnd) {
          const titles = this.getTitle(this.router.routerState, this.router.routerState.root);
          const title = 'Pharos : ' + (titles.length > 0 ? titles[0] : 'Illuminating the Druggable Genome');
          this.titleService.setTitle(title);
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
    const page = this.tourService.getPage();
    switch (tutorial) {
      case TourType.WhatsNew38:
        this.tourService.whatsNew(true);
        break;
      case TourType.CustomTargetListTour:
        this.tourService.customTargetLists();
        break;
      case TourType.StructureSearchTour:
        this.tourService.structureSearchTour();
        break;
      case TourType.ListPagesTour:
        this.tourService.listPagesTour(page);
        break;
      case TourType.TargetExpressionTour:
        this.tourService.runTutorial(tutorial);
        break;
      case TourType.ProteinStructureTour:
        this.tourService.proteinStructureTour();
        break;
      case TourType.UpsetChartTour:
        this.tourService.upsetPlotTour(page[0]);
        break;
      default:
        this.tourService.whatsNew(false);
        break;
    }
  }

  getTitle(state, parent) {
    const data = [];
    const url = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      const subpath = parent.snapshot.url?.length > 1 ? parent.snapshot.url[1].path : '';
      let title = parent.snapshot.data.title;
      if (subpath) {
        title = title + ' - ' + subpath;
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
}
