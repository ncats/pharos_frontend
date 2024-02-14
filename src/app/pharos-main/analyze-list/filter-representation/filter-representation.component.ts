import {ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Facet} from '../../../models/facet';
import {CentralStorageService} from '../../../pharos-services/central-storage.service';
import {PharosProperty} from '../../../models/pharos-property';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {takeUntil} from 'rxjs/operators';
import {SelectedFacetService} from '../../data-list/filter-panel/selected-facet.service';
import {PathResolverService} from '../../data-list/filter-panel/path-resolver.service';
import {FeatureTrackingService} from '../../../pharos-services/feature-tracking.service';
import {TourType} from '../../../models/tour-type';
import {CommonModule, isPlatformServer} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {ComponentHeaderComponent} from '../../../tools/component-header/component-header.component';
import {MatSelectModule} from '@angular/material/select';
import {GenericTableComponent} from '../../../tools/generic-table/generic-table.component';

@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatCardModule, FormsModule, MatInputModule, ComponentHeaderComponent,
    MatSelectModule, GenericTableComponent],
  selector: 'pharos-analyze-list',
  templateUrl: './filter-representation.component.html',
  styleUrls: ['./filter-representation.component.scss']
})
export class FilterRepresentationComponent extends DynamicPanelComponent implements OnInit {
  constructor(
    private router: Router,
    public dynamicServices: DynamicServicesService,
    private _route: ActivatedRoute,
    private centralStorageService: CentralStorageService,
    private pharosApiService: PharosApiService,
    private changeRef: ChangeDetectorRef,
    private selectedFacetService: SelectedFacetService,
    private pathResolverService: PathResolverService,
    private featureTrackingService: FeatureTrackingService,
    @Inject(PLATFORM_ID) private platformID: any
  ) {
    super(dynamicServices);
  }
  tourType: TourType;
  count: number;

  facetFields: PharosProperty[] = [
    new PharosProperty({
      name: 'name',
      label: 'Value',
      width: '30%',
      sortable: true
    }),
    new PharosProperty({
      name: 'count',
      label: 'Count',
      sortable: true
    }),
    // new PharosProperty({
    //   name: 'table',
    //   label: 'Contingency Table'
    // }),
    new PharosProperty({
      name: 'statistic',
      label: 'Observed Frequency',
      sortable: true
    }),
    new PharosProperty({
      name: 'nullValue',
      label: 'Expected Frequency',
      sortable: true
    }),
    new PharosProperty({
      name: 'oddsRatio',
      label: 'Odds Ratio',
      sortable: true
    }),
    new PharosProperty({
      name: 'oddsRatioCI',
      label: 'OR 95% Conf'
    }),
    new PharosProperty({
      name: 'pValue',
      label: 'p-value',
      sortable: true,
      width: '75px'
    }),
    new PharosProperty({
      name: 'qValue',
      label: 'p-adjust',
      sortable: true,
      width: '75px'
    })
  ];

  selectedFacetProps: any[];
  selectedFacet: Facet;
  selectedFacetName: string;

  fullFacetList: string[] = [];
  listIsFiltered = true;

  ngOnInit(): void {
    this.tourType = TourType.FilterValueEnrichment;
    this._data
      // listen to data as long as term is undefined or null
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.initialize();
        this.fetchAllFilterOptions();
      });
  }

  initialize() {
    this.selectedFacetName = this._route.snapshot.queryParamMap.get('enrichmentFacet') || this.selectedFacetName || this.defaultFacetName();
    this.listIsFiltered = this.calcListIsFiltered();
    this.count = this.data.count;
  }

  filterIsInUse(filterName: string) {
    return !!this.selectedFacetService.getFacetByName(filterName);
  }

  calcListIsFiltered() {
    let isFiltered = false;
    this._route.snapshot.queryParamMap.keys.forEach(key => {
      if ([
        'collection',
        'query',
        'associatedTarget',
        'associatedDisease',
        'associatedStructure',
        'associatedLigand',
        'similarity',
        'sequence'
      ].includes(key) && this._route.snapshot.queryParamMap.get(key).length > 0) {
        isFiltered = true;
      }
    });
    if (isFiltered) {
      return true;
    }
    return this.selectedFacetService.getFacetsAsObjects().length > 0;
  }

  linkPath() {
    return this._route.snapshot.data.path;
  }

  defaultFacetName() {
    switch (this.linkPath()) {
      case 'targets':
        return 'Target Development Level';
      case 'diseases':
        return 'Highest TDL';
      case 'ligands':
        return 'Type';
    }
  }

  listFieldName() {
    switch (this.linkPath()) {
      case 'targets':
        return 'targetFacets';
      case 'diseases':
        return 'diseaseFacets';
      case 'ligands':
        return 'ligandFacets';
    }
  }

  facetChanged(event) {
    const path = this.router.url.split('?')[0];
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      fragment: 'filter-representation'
    };
    navigationExtras.queryParams = {
      enrichmentFacet: this.selectedFacetName
    };
    this.featureTrackingService.trackFeature('Calculate Filter Value Enrichment',
      this.centralStorageService.getModel(this._route), this.selectedFacetName);
    this.router.navigate([path], navigationExtras);
  }

  linkClicked(filterValue: string) {
    this.selectedFacetService.setFacets(
      {
        name: this.selectedFacet.facet,
        change:
          {
            added: [filterValue]
          }
      });
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams, this._route, this.selectedFacetService.getPseudoFacets());
  }

  fetchAllFilterOptions() {
    if (!this.listIsFiltered || isPlatformServer(this.platformID)) {
      this.loading = false;
      return;
    }
    // if (this.filterIsInUse(this.selectedFacetName)) {
    //   this.loading = false;
    //   return;
    // }
    this.loading = true;
    this.pharosApiService.getAllFacetOptions(
      this.linkPath(),
      this._route.snapshot.queryParamMap,
      this.selectedFacetName, true, true)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
      next:
        res => {
          this.fullFacetList = res.data.normalizableFilters[this.listFieldName()];
          this.selectedFacet = new Facet(res.data.results.facets.find(f => f.facet === this.selectedFacetName));
          this.selectedFacetName = this.selectedFacet.facet;
          this.selectedFacetProps = this.selectedFacet.toProps(this.linkClicked.bind(this));
          this.loading = false;
          this.changeRef.detectChanges();
        },
      error: e => {
        alert(e.message);
        this.loading = false;
      }
    });
  }

  changeSort(event){
    const column = event.active;
    const direction = event.direction === 'asc' ? 1 : -1;
    this.selectedFacetProps.sort((a, b) => {
      const valA = a[column].term;
      const valB = b[column].term;
      if (column === 'name') {
        return direction * valA.localeCompare(valB);
      }
      else if (column === 'pValue') {
        const rawA = this.selectedFacet.values.find(f => f.name === a['name'].term);
        const rawB = this.selectedFacet.values.find(f => f.name === b['name'].term);
        if (rawA.stats && !rawB.stats) {
          return 1;
        }
        if (!rawA.stats && rawB.stats) {
          return -1;
        }
        if (rawA.stats.pValue == rawB.stats.pValue) {
          return direction * (rawB.count - rawA.count);
        }
        return direction * (rawA.stats.pValue - rawB.stats.pValue);
      }
      return direction * (Number.parseFloat(valA) - Number.parseFloat(valB));
    });
  }

}
