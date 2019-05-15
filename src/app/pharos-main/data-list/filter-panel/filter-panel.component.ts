import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Facet} from '../../../models/facet';
import {Subject} from 'rxjs';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {FacetRetrieverService} from './facet-retriever.service';
import {ResponseParserService} from '../../../pharos-services/response-parser.service';
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
   * @param {ResponseParserService} responseParserService
   * @param {PharosConfig} pharosConfig
   */
  constructor(
              private pathResolverService: PathResolverService,
              private facetRetrieverService: FacetRetrieverService,
              private responseParserService: ResponseParserService,
              private pharosConfig: PharosConfig) { }

  /**
   * set up subscriptions to get facets
    */
  ngOnInit() {
    this.facetRetrieverService.loaded$.subscribe(res => {
      if (res === true) {
        this.facets = [];
        this.pharosConfig.getFacets(this.pathResolverService.getPath()).map(label => {
          this.facetRetrieverService.getFacetObservable(label.name).subscribe(facet => {
            if (facet) {
              facet.label = label.label;
              this.facetsMap.set(facet.label, facet);
            }
              this.facets = Array.from(this.facetsMap.values());
          });
        });
        }
    });
  }

  /**
   * retrieve all facets from service
   */
  getAllFacets(): void {
    this.facetRetrieverService.getAllFacets().subscribe(facets => {
      this.allFacets = Array.from(facets.values());
      this.facets = this.allFacets;
        this.loading = false;
    });
  }

  /**
   * toggle the show all facets view
   * load all facets as needed
   */
  toggleFacets() {
    this.fullWidth = !this.fullWidth;
    this.loading = true;
    if (this.fullWidth) {
      this.getAllFacets();
    } else {
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
