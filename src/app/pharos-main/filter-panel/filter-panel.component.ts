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
  /**
   *  facet list
   *  todo: see if this is used as an input
   */
  facets: any;
  allFacets: any;

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

  // todo : try to lazy load this, only when opened

  ngOnInit() {
   const labels = this.environmentVariablesService.getFacets(this.pathResolverService.getPath()).map(label => {
     console.log(label);
     return label;

   });
   console.log(labels);
    this.responseParserService.facetsData$
      .pipe(
        takeUntil(this.ngUnsubscribe)
        )
      .subscribe(res => {
        console.log(res);
        this.facets = [];
        this.allFacets = res;
        res.forEach(facet => {
          const filteredLabels = labels.filter(label => label.name === facet.name);
          if (filteredLabels.length > 0) {
            const match = filteredLabels[0];
            match['values'] = facet.values;
            this.facets.push(match);
          }
        });
      });

    /*      const params$: Observable<any> =
      combineLatest(
        this.pathResolverService.path$,
        this.facetRetrieverService.loaded$
      );

    /!**
     * this tracks the facet data itself, not facet selection
     *!/
    params$
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(([path, loaded]) => {
        if (loaded) {
         /!* this.facets = [];
          this.environmentVariablesService.getFacets(path).map(facet => {
            const temp = this.facetRetrieverService.getFacet(facet.name);
            if (temp) {
              temp.label = facet.label;
              this.facets.push(temp);
            }
          });*!/
        }
      });*/
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
