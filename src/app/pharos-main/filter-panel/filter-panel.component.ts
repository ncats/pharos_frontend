import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Facet} from '../../models/facet';
import {Subject, combineLatest} from 'rxjs';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {FacetRetrieverService} from '../services/facet-retriever.service';
import {takeUntil, map} from 'rxjs/operators';
import {Observable} from 'rxjs/index';
import {ResponseParserService} from "../../pharos-services/response-parser.service";

/**
 * panel that hold a facet table for selection
 */
@Component({
  selector: 'pharos-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FilterPanelComponent implements OnInit, OnDestroy {

  facets: Facet[];
  facetsMap: Map<string, any> = new Map<string, any>();
  allFacets: Facet[];
  fullWidth = false;
  value: string;


  /**
   * subject to unsubscribe on destroy
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
              private ref: ChangeDetectorRef,
              private pathResolverService: PathResolverService,
              private facetRetrieverService: FacetRetrieverService,
              private responseParserService: ResponseParserService,
              private environmentVariablesService: EnvironmentVariablesService) { }

  ngOnInit() {
    this.facetRetrieverService.loaded$.subscribe(res => {
      if(res === true) {
        this.facets = [];
        this.environmentVariablesService.getFacets(this.pathResolverService.getPath()).map(label => {
          this.facetRetrieverService.getFacetObservable(label.name).subscribe(facet => {
            if(facet) {
              facet.label = label.label;
              this.facetsMap.set(facet.label, facet);
            }
              this.facets = Array.from(this.facetsMap.values());
          });
        });
        }
    });
  }

  getAllFacets():void {
    this.facetRetrieverService.getAllFacets().subscribe(facets => {
      this.allFacets = Array.from(facets.values());
      this.facets = this.allFacets;
    });
  }

  toggleFacets() {
    this.fullWidth = !this.fullWidth;
    if(this.fullWidth === true) {
    this.getAllFacets();
    }
  }

  search(term: string): void {
    this.facets = this.allFacets.filter(facet => {
      return JSON.stringify(facet).toLowerCase().includes(term.toLowerCase());
    });
  }

  clear(): void {
    this.value = '';
    this.facets = this.allFacets;
  }
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
   * function to unsubscribe on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
