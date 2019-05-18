import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Facet} from '../../../models/facet';
import {Subject} from 'rxjs';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {FacetRetrieverService} from './facet-retriever.service';
import {PharosConfig} from '../../../../config/pharos-config';

/**
 * panel that hold a facet table for selection
 */
@Component({
  selector: 'pharos-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit, OnDestroy {
  /**
   * close the filter panel
   * @type {EventEmitter<boolean>}
   */
  @Output() closeClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * list of facets shown in the filter panel
   */
  facets: Facet[];

  /**
   * map of facets since they are dynamically loaded
   * @type {Map<string, any>}
   */
  facetsMap: Map<string, any> = new Map<string, any>();

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


  /**
   * subject to unsubscribe on destroy
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject();

  /**
   * set up services to get facets
   * @param {PathResolverService} pathResolverService
   * @param {FacetRetrieverService} facetRetrieverService
   * @param {PharosConfig} pharosConfig
   */
  constructor(
              private pathResolverService: PathResolverService,
              private facetRetrieverService: FacetRetrieverService,
              private pharosConfig: PharosConfig) { }

  /**
   * set up subscriptions to get facets
    */
  ngOnInit() {
    this.loading = true;
    const flist = this.pharosConfig.getFacets(this.pathResolverService.getPath());
    this.facetRetrieverService.getAllFacets().subscribe(facets => {
      if(facets) {
        this.filteredFacets = [];
        this.allFacets = Array.from(facets.values());
        this.filteredFacets = flist.map(f => {
          const facet = facets.get(f.name);
          facet.label = f.label;
          return facet;
        });
        this.loading = false;
        this.facets = this.filteredFacets;
      }
    });
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
    this.pathResolverService.removeAll();
  }


  /**
   * function to track facet object to avoid reloading if the facet doesn't change
   * @param {string} index
   * @param {Facet} item
   * @returns {Facet}
   */
  trackByFn(index: string, item: Facet) {
    return item;
  }

  /**
   * close the filter panel
   */
  closeMenu() {
    this.closeClick.emit();
  }

  /**
   * function to unsubscribe on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
