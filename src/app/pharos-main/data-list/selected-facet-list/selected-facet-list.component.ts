import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {Facet} from '../../../models/facet';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {SelectedFacetService} from '../filter-panel/selected-facet.service';

/**
 * panel to show selected facets or queries, and remove them
 */
@Component({
  selector: 'pharos-facet-list',
  templateUrl: './selected-facet-list.component.html',
  styleUrls: ['./selected-facet-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SelectedFacetListComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  /**
   * list of selected facets
   */
  @Input() facets: Facet[];

  /**
   * set up route watching
   * @param {ActivatedRoute} _route
   * @param router
   * @param changeRef
   * @param selectedFacetService
   * @param {PathResolverService} pathResolverService
   */
  constructor(private _route: ActivatedRoute,
              private router: Router,
              private changeRef: ChangeDetectorRef,
              private selectedFacetService: SelectedFacetService,
              private pathResolverService: PathResolverService) {
    super();
  }

  /**
   * set up subscriptions for fetching facets and watching route changes
   */
  ngOnInit() {
    console.log(this);
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalize the component
        if (e instanceof NavigationEnd) {
          this.facets = this.selectedFacetService.getFacetsAsObjects();
          this.changeRef.markForCheck();
        }
      });
    this.facets = this.selectedFacetService.getFacetsAsObjects();
    }

  /**
   * remove a specific facet and all selected fields
   * @param facet
   */
  removefacetFamily(facet: Facet): void {
    this.selectedFacetService.removefacetFamily(facet);
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams);
  }

  /**
   * remove single field from a facet
   * @param facet
   * @param {string} field
   */
  removeField(facet: string, field: string): void {
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams);
  }

  /**
   * clear all queries/facets
   */
  removeAll(): void {
    this.selectedFacetService.clearFacets();
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams);
  }

  ngOnDestroy(): void {
    this.facets = [];
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
