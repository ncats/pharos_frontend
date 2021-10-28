import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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

@Component({
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
    private pathResolverService: PathResolverService
  ) {
    super(dynamicServices);
  }

  get models() {
    return this.model + 's';
  }

  model: string;

  facetFields: PharosProperty[] = [
    new PharosProperty({
      name: 'name',
      label: 'Value',
      width: '50%',
      sortable: true
    }),
    new PharosProperty({
      name: 'count',
      label: 'Count',
      sortable: true
    }),
    new PharosProperty({
      name: 'table',
      label: 'Contingency Table'
    }),
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
      name: 'pValue',
      label: 'p-value',
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
    this._data
      // listen to data as long as term is undefined or null
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.initialize();
        this.fetchAllFilterOptions();
      });
    this.initialize();
    this.fetchAllFilterOptions();
  }

  initialize() {
    this.selectedFacetName = this._route.snapshot.queryParamMap.get('enrichmentFacet') || this.selectedFacetName || this.defaultFacetName();
    this.listIsFiltered = this.calcListIsFiltered();
    this.model = this._route.snapshot.data.path.slice(0, -1);
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
        'similarity'
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
    this.router.navigate([path], navigationExtras);
    // this.fetchAllFilterOptions();
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
    if (!this.listIsFiltered) {
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
      this.selectedFacetName, true, true).subscribe({
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
        if (rawA.stats.representation === rawB.stats.representation) {
          if (rawA.stats.pValue == rawB.stats.pValue) {
            return direction * (rawB.count - rawA.count);
          }
          return direction * (rawA.stats.representation * (rawA.stats.pValue - rawB.stats.pValue));
        }
        return direction * (rawB.stats.representation - rawA.stats.representation);
      }
      return direction * (Number.parseFloat(valA) - Number.parseFloat(valB));
    });
  }

}
