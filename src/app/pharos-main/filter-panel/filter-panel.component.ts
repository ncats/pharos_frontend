import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Facet} from '../../models/facet';
import {Subject} from 'rxjs/Subject';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {FacetRetrieverService} from '../services/facet-retriever.service';
import {takeUntil} from 'rxjs/operators';
import {combineLatest} from 'rxjs/observable/combineLatest';

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
    const params$ =
      combineLatest(
      this.pathResolverService.path$,
      this.facetRetrieverService.loaded$,
      (path, loaded) => ({path: path, loaded: loaded}))
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((res) => {
        if (res.loaded) {
          this.facets = [];
          this.environmentVariablesService.getFacets(res.path).map(facet => {
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
