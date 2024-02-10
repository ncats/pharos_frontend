import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Facet, Field, UpsetOptions} from '../../../models/facet';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {SelectedFacetService} from '../filter-panel/selected-facet.service';
import {PathResolverService} from '../filter-panel/path-resolver.service';
import {UnfurlingMetaService} from '../../../pharos-services/unfurling-meta.service';
import {MolChangeService} from '../../../tools/marvin-sketcher/services/mol-change.service';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {Helper} from '../../../models/utilities';
import {CentralStorageService} from '../../../pharos-services/central-storage.service';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatChip} from '@angular/material/chips';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {StructureViewComponent} from '../../../tools/structure-view/structure-view.component';

/**
 * panel to show selected facets or queries, and remove them
 */
@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatChip, MatIconModule, MatButtonModule, StructureViewComponent],
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
              public dynamicServices: DynamicServicesService,
              private centralStorageService: CentralStorageService) {
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
          this.selectedFacetService.getFacetsFromParamMap(this._route.snapshot.queryParamMap);
          this.facets = this.selectedFacetService.getFacetsAsObjects();
          this.changeRef.markForCheck();
        }
      });
    this.selectedFacetService.getFacetsFromParamMap(this._route.snapshot.queryParamMap);
    this.facets = this.selectedFacetService.getFacetsAsObjects();
    this.metaService.setMetaData(
      {
        description: this.selectedFacetService.newDescription(this._route),
        title: this.selectedFacetService.newTitle(this._route)
      });
    this.associatedStructure = this._route.snapshot.queryParamMap.get('associatedStructure');
    if (this.associatedStructure) {
      const parsedName = Helper.parseAssociatedStructure(this.associatedStructure);
      this.ligandSmiles = parsedName.ligandSmiles;
      this.structureSearchType = parsedName.structureSearchType;
    }
    this.changeRef.markForCheck();
  }

  editStructure() {
    this.molChangeService.updateSmiles(this.ligandSmiles, 'edit');
    this.molChangeService.updateSearchType(this.structureSearchType);
    this.router.navigate(['/structure']);
  }

  formatUpset(upsetVal: string) {
    return UpsetOptions.parseFromUrl(upsetVal);
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

  removeUpset(facet: string, upsetObj: UpsetOptions): void {
    this.selectedFacetService.removeUpset(facet, upsetObj);
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

  getName(field: Field, facet: Facet) {
    if (facet.facet === 'sequence') {
      if (field.name.length > 15) {
        return field.name.substr(0, 15) + '...';
      }
      return field.name;
    }
    if (facet.facet === 'collection') {
      const name = this.centralStorageService.collections.get(field.name) || field.name;
      if (name.length > 25) {
        return name.substr(0, 25) + '...';
      }
      return name;
    }
    return field.name;
  }

  ngOnDestroy(): void {
    this.facets = [];
    super.ngOnDestroy();
  }
}
