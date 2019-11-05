import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {Facet} from '../../../models/facet';
import {Subject} from 'rxjs';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {SelectedFacetService} from './selected-facet.service';
import {PharosConfig} from '../../../../config/pharos-config';
import {PharosProfileService} from '../../../auth/pharos-profile.service';
import {PanelOptions} from '../../pharos-main.component';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

/**
 * panel that hold a facet table for selection
 */
@Component({
  selector: 'pharos-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FilterPanelComponent implements OnInit, OnDestroy {
  panelOptions: PanelOptions = {
    mode : 'side',
    class : 'filters-panel',
    opened: true,
    fixedInViewport: true,
    fixedTopGap: 70,
    role: 'directory'
    /* [mode]="isSmallScreen!==true ? 'side' : 'over'"
     [opened]="isSmallScreen !== true"*/
  };

  /**
   * close the filter panel
   * @type {EventEmitter<boolean>}
   */
  @Output() menuToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * list of facets shown in the filter panel
   */
  @Input() facets: Facet[];

  /**
   * list of initial facets to display
   */
  filteredFacets: Facet[];

  /**
   * list of all facets to display
   */
  allFacets: Facet[];

  /**
   * show all facets boolean
   * @type {boolean}
   */
  fullWidth = false;

  /**
   * ngmodel of search value to filter facets when all are displayed
   */
  value: string;

  /**
   * boolean to track if facets are loading/shown
   * @type {boolean}
   */
  loading = false;

  @Input() data: any = {};

  /**
   * subject to unsubscribe on destroy
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject();

  /**
   * set up services to get facets
   * @param selectedFacetService
   * @param changeRef
   * @param router
   * @param _route
   * @param profileService
   * @param pathResolverService
   * @param {PharosConfig} pharosConfig
   */
  constructor(
              private selectedFacetService: SelectedFacetService,
              private changeRef: ChangeDetectorRef,
              private router: Router,
              private _route: ActivatedRoute,
              private profileService: PharosProfileService,
              private pathResolverService: PathResolverService,
              private pharosConfig: PharosConfig) { }

  /**
   * set up subscriptions to get facets
    */
  ngOnInit() {
    console.log(this);
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.facets = this.data.facets;
          this.selectedFacetService.getFacetsFromParamMap(this._route.snapshot.queryParamMap);
          this.changeRef.detectChanges();
        }
      });
        this.loading = false;
        this.facets = this.data.facets;
    this.selectedFacetService.getFacetsFromParamMap(this._route.snapshot.queryParamMap);
    this.changeRef.markForCheck();
      }

  /**
   * toggle the show all facets view
   * load all facets as needed
   */
  toggleFacets() {
    this.loading = true;
    this.fullWidth = !this.fullWidth;
    if (this.fullWidth) {
          this.facets = this.allFacets;
      this.loading = false;
    } else {
      this.facets = this.filteredFacets;
      this.loading = false;
    }
  }

  /**
   * search an filter facets
   * @param {string} term
   */
  search(term: string): void {
    this.facets = this.allFacets.filter(facet => {
      return JSON.stringify(facet).toLowerCase().includes(term.toLowerCase());
    });
  }

  /**
   * clear the all facets filter search
   */
  clear(): void {
    this.value = '';
    this.facets = this.allFacets;
  }

  /**
   * remove all selected facets
   */
  removeAll(): void {
    this.selectedFacetService.clearFacets();
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams);
  }


  /**
   * function to track facet object to avoid reloading if the facet doesn't change
   * @param {string} index
   * @param {Facet} item
   * @returns {Facet}
   */
  trackByFn(index: string, item: Facet) {
    return item.facet;
  }

  /**
   * close the filter panel
   */
  toggleMenu() {
    this.menuToggle.emit();
  }

  /**
   * function to unsubscribe on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
