import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {Facet} from '../../../models/facet';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {SelectedFacetService} from '../filter-panel/selected-facet.service';
import {PathResolverService} from '../filter-panel/path-resolver.service';
import {UnfurlingMetaService} from "../../../pharos-services/unfurling-meta.service";
import {NavSectionsService} from "../../../tools/sidenav-panel/services/nav-sections.service";

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
              private pathResolverService: PathResolverService,
              private metaService: UnfurlingMetaService,
              public navSectionsService: NavSectionsService) {
    super(navSectionsService);
  }

  /**
   * set up subscriptions for fetching facets and watching route changes
   */
  ngOnInit() {
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
    this.metaService.setMetaData({description: this.newDescription(), title: this.newTitle()});
    this.changeRef.markForCheck();
  }

  /**
   * constructs the new title to show for the unfurled URL link
   */
  newTitle(): string{
    let listType = this._route.snapshot.data.path;
    let listName = listType.replace("/","").toLowerCase().slice(0,listType.length-1);
    const listTitle = listName.charAt(0).toUpperCase() + listName.slice(1);
    return `Pharos: ${listTitle} List`;
  }

  /**
   * constructs the new description to show for the unfurled URL link
   */
  newDescription(): string{
    let str = `Found ${this._route.snapshot.data.results.count} ${this._route.snapshot.data.path}. `;
    if(this.facets.length){
      str += 'The following filters were applied: ';
      str += this.facets.map(f => f.facet + " = " + f.values.map(v => v.name).join(' OR ')).join((" AND "));
    }
    return str;
  }

  /**
   * remove a specific facet and all selected fields
   * @param facet
   */
  removefacetFamily(facet: Facet): void {
    this.selectedFacetService.removefacetFamily(facet);
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams, this._route, this.selectedFacetService.getPseudoFacets());
     }

  /**
   * remove single field from a facet
   * @param facet
   * @param {string} field
   */
  removeField(facet: string, field: string): void {
    this.selectedFacetService.removeField(facet, field);
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams, this._route, this.selectedFacetService.getPseudoFacets());
  }

  /**
   * clear all queries/facets
   */
  removeAll(): void {
    this.selectedFacetService.clearFacets();
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams, this._route);
  }

  ngOnDestroy(): void {
    this.facets = [];
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
