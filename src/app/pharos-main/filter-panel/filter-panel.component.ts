import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Facet} from '../../models/facet';
import {Subject, combineLatest} from 'rxjs';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {FacetRetrieverService} from '../services/facet-retriever.service';
import {takeUntil} from 'rxjs/operators';
import {Observable} from 'rxjs/index';

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
  /**
   * input facet list
   *  todo: see if this is used as an input
   */
  @Input() facets?: any;

  /**
   * subject to unsubscribe on destroy
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
              private ref: ChangeDetectorRef,
              private pathResolverService: PathResolverService,
              private facetRetrieverService: FacetRetrieverService,
              private environmentVariablesService: EnvironmentVariablesService) { }

  // todo : try to lazy load this, only when opened
  /**
   * merge path and laded facets to retrieve facet object
   */
  ngOnInit() {
    const params$: Observable<any> =
      combineLatest(
        this.pathResolverService.path$,
        this.facetRetrieverService.loaded$
      );

    /**
     * this tracks the facet data itself, not facet selection
     */
    params$
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(([path, loaded]) => {
        if (loaded) {
          this.facets = [];
          this.environmentVariablesService.getFacets(path).map(facet => {
            const temp = this.facetRetrieverService.getFacet(facet.name);
            if (temp) {
              temp.label = facet.label;
              this.facets.push(temp);
            }
          });
        }
      });
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
   * function to unubscribe on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
