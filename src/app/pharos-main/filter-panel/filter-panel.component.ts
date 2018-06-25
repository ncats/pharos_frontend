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

@Component({
  selector: 'pharos-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FilterPanelComponent implements OnInit, OnDestroy {
  facetsList: any;
  @Input() facets?: any;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
              private ref: ChangeDetectorRef,
              private pathResolverService: PathResolverService,
              private facetRetrieverService: FacetRetrieverService,
              private environmentVariablesService: EnvironmentVariablesService) { }

  // todo : try to lazy load this, only when opened
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
            console.log(facet);
            const temp = this.facetRetrieverService.getFacet(facet.name);
            if (temp) {
              temp.label = facet.label;
              this.facets.push(temp);
            }
          });
        }
      });
  }

  trackByFn(index: string, item: Facet) {
    return item;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
