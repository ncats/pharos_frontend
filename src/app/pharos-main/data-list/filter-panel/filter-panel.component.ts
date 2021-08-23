import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {Facet, Field} from '../../../models/facet';
import {forkJoin, Observable, Subject} from 'rxjs';
import {PathResolverService} from './path-resolver.service';
import {SelectedFacetService} from './selected-facet.service';
import {PharosConfig} from '../../../../config/pharos-config';
import {PharosProfileService} from '../../../auth/pharos-profile.service';
import {PanelOptions} from '../../pharos-main.component';
import {map, take, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {environment} from '../../../../environments/environment';

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
  isProduction = environment.production;
  /**
   * set up services to get facets
   * @param selectedFacetService
   * @param changeRef
   * @param router
   * @param _route
   * @param profileService
   * @param pathResolverService
   * @param pharosApiService
   * @param firestore
   * @param {PharosConfig} pharosConfig
   */
  constructor(
    private selectedFacetService: SelectedFacetService,
    private changeRef: ChangeDetectorRef,
    private router: Router,
    private _route: ActivatedRoute,
    private profileService: PharosProfileService,
    private pathResolverService: PathResolverService,
    private pharosApiService: PharosApiService,
    private firestore: AngularFirestore,
    private pharosConfig: PharosConfig) { }

  panelOptions: PanelOptions = {
    mode: 'side',
    class: 'filters-panel',
    opened: true,
    fixedInViewport: true,
    fixedTopGap: 70,
    role: 'directory'
  };

  /**
   * close the filter panel
   * @type {EventEmitter<boolean>}
   */
  @Output() menuToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  showInfo: Map<Facet, boolean> = new Map<Facet, boolean>();

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

  user: any;

  @Input() customFacets: Facet[] = [];

  /**
   * subject to unsubscribe on destroy
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject();

  /**
   * list of facets shown in the filter panel
   */
  @Input() facets: Facet[];

  nonEmptyFacets() {
    return this.facets.filter(facet => facet.values.length > 0);
  }


  toggleFacetInfo(facet: Facet){
    const currentVal = this.showingInfo(facet);
    this.showInfo.set(facet, !currentVal);
  }

  showingInfo(facet: Facet): boolean{
    if (this.showInfo.has(facet)){
      return this.showInfo.get(facet);
    }
    return false;
  }
  /**
   * set up subscriptions to get facets
   */
  ngOnInit() {
    this.profileService.profile$.subscribe(user => {
      if (user) {
        // User is signed in.
        this.user = user;
        if (user.data().collection && this._route.snapshot.data.path === 'targets') {
          this.clearCustomFacets();
          const customFacets = new Facet({
            facet: 'collection',
            label: 'Custom Collections',
            values: []
          });

          // todo this isn't pageable
          const collections: [Observable<Field>] = user.data().collection.map(batch => {
            return this.firestore.collection<any>('target-collection')
              .doc<any>(batch)
              .valueChanges()
              .pipe(
                take(1),
                map(res => {
                  const ret = new Field({
                    name: res.collectionName,
                    value: batch,
                    count: res.targetList.length
                  });
                  return ret;
                })
              );
          });

          forkJoin([...collections]).subscribe(res => {
            const collectionFacet = new Facet({
              facet: 'collection',
              label: 'Custom Collections',
              values: res
            });
            this.customFacets.push(collectionFacet);
            if (this.customFacets.length > 1){
              this.customFacets.shift();
            }
            this.facets = this.customFacets.concat(this.filteredFacets);
            this.changeRef.markForCheck();
          });

        }
      } else {
        // User is not signed in.
        this.clearCustomFacets();
      }
    });

    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationStart && e.navigationTrigger === "popstate"){
          this.selectedFacetService.clearFacets();
        }
        if (e instanceof NavigationEnd) {
          if (this.data) {
            this.allFacets = [];
            this.filteredFacets = this.data.facets;
            this.facets = this.customFacets.concat(this.filteredFacets);
            this.selectedFacetService.getFacetsFromParamMap(this._route.snapshot.queryParamMap);
            this.changeRef.detectChanges();
          }
        }
      });
    this.filteredFacets = this.data.facets;
    this.facets = this.customFacets.concat(this.filteredFacets);
    this.selectedFacetService.getFacetsFromParamMap(this._route.snapshot.queryParamMap);
    this.changeRef.markForCheck();
  }

  clearCustomFacets(){
    this.customFacets = [];
    if (this.data && this.data.facets) {
      this.facets = this.customFacets.concat(this.filteredFacets);
    }
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
      if (!this.allFacets || this.allFacets.length === 0) {
        this.GetDataAndShowFullPanel();
      } else {
        this.openFullPanel();
      }
    } else {
      this.closeFullPanel();
    }
  }

  /**
   * retrieve data from the server about all the facets, and open the full page view
   */
  GetDataAndShowFullPanel(){
    this.pharosApiService.getAllFacets(
      this._route.snapshot.data.path,
      this._route.snapshot.queryParamMap).subscribe({
      next: res => {
        this.allFacets = this.customFacets.concat(res.data.results.facets.map(facet => new Facet(facet)));
        this.openFullPanel();
      },
      error: e => {
        throw(e);
      }
    });
  }

  /**
   * open the sidebar view
   */
  closeFullPanel() {
    this.panelOptions.mode = 'side';
    this.facets = this.filteredFacets;
    this.loading = false;
    this.changeRef.markForCheck();
  }

  /**
   * open the full page view
   */
  openFullPanel() {
    this.panelOptions.mode = 'over';
    this.facets = this.allFacets;
    this.loading = false;
    this.changeRef.markForCheck();
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
    this.pathResolverService.navigate(queryParams, this._route);
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
    this.panelOptions.mode = 'side';
    this.fullWidth = false;
    this.loading = false;
    this.menuToggle.emit();
  }

  facetIsPrediction(facet: Facet){
    return facet.facet.toLowerCase().startsWith('predict');
  }

  getFacetPanelID(facet: Facet) {
    return facet.facet.replace(/\s/g, '');
  }

  /**
   * function to unsubscribe on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
