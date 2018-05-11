import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
})
export class FilterPanelComponent implements OnInit, OnDestroy {
  facetsList: any;
  facets: any;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
              private ref: ChangeDetectorRef,
              private pathResolverService: PathResolverService,
              private facetRetrieverService: FacetRetrieverService,
              private environmentVariablesService: EnvironmentVariablesService) { }

  ngOnInit() {
    const params$: Observable<any> =
      combineLatest(
        this.pathResolverService.path$,
        this.facetRetrieverService.loaded$);

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
          //  this.ref.markForCheck()
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
