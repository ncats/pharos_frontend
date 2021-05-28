import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {Facet} from '../../../models/facet';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {SelectedFacetService} from '../filter-panel/selected-facet.service';
import {PathResolverService} from '../filter-panel/path-resolver.service';
import {UnfurlingMetaService} from '../../../pharos-services/unfurling-meta.service';
import {MolChangeService} from '../../../tools/marvin-sketcher/services/mol-change.service';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';

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
  associatedStructure: string;
  ligandSmiles: string;
  structureSearchType: string;
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
              private molChangeService: MolChangeService,
              public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
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
    this.metaService.setMetaData(
      {
        description: this.selectedFacetService.newDescription(this._route),
        title: this.selectedFacetService.newTitle(this._route)
      });
    this.associatedStructure = this._route.snapshot.queryParamMap.get('associatedStructure');
    if (this.associatedStructure) {
      const pieces = this.associatedStructure.split('!');
      if (pieces.length > 1) {
        pieces.forEach(p => {
          if (p.toLowerCase().substr(0, 3) !== 'sub' && p.toLowerCase().substr(0, 3) !== 'sim') {
            this.ligandSmiles = p;
          } else {
            this.structureSearchType = p.toLowerCase().substr(0, 3);
          }
        });
      } else {
        this.ligandSmiles = this.associatedStructure;
      }
    }
    this.changeRef.markForCheck();
  }

  editStructure(){
    this.molChangeService.updateSmiles(this.ligandSmiles, 'edit');
    this.molChangeService.updateSearchType(this.structureSearchType);
    this.router.navigate(['/structure']);
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
