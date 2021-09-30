import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {ActivatedRoute} from '@angular/router';
import {Facet} from '../../../models/facet';
import {CentralStorageService} from '../../../pharos-services/central-storage.service';
import {PharosProperty} from '../../../models/pharos-property';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'pharos-analyze-list',
  templateUrl: './filter-representation.component.html',
  styleUrls: ['./filter-representation.component.scss']
})
export class FilterRepresentationComponent extends DynamicPanelComponent implements OnInit {

  constructor(
    public dynamicServices: DynamicServicesService,
    private _route: ActivatedRoute,
    private centralStorageService: CentralStorageService,
    private pharosApiService: PharosApiService,
    private changeRef: ChangeDetectorRef
  ) {
    super(dynamicServices);
  }

  model: string;
  get models() {
    return this.model + 's';
  }

  facetFields: PharosProperty[] = [
    new PharosProperty({
      name: 'name',
      label: 'Value'
    }),
    new PharosProperty({
      name: 'count',
      label: 'Count'
    }),
    // new PharosProperty({
    //   name: 'oddsRatio',
    //   label: 'Odds Ratio'
    // }),
    new PharosProperty({
      name: 'statistic',
      label: 'Frequency'
    }),
    new PharosProperty({
      name: 'nullValue',
      label: 'Expected Frequency'
    }),
    new PharosProperty({
      name: 'pValue',
      label: 'p-value'
    }),
    // new PharosProperty({
    //   name: 'rejected',
    //   label: 'Rejected'
    // })
  ];

  selectedFacetProps: any;
  selectedFacet: Facet;
  selectedFacetName: string;

  fullFacetList: string[] = [];

  ngOnInit(): void {
    // const catFacets = this.data.facets.filter(f => f.dataType === 'Category' && f.values.length > 0).map(f => new Facet(f));
    // const startingFacet = catFacets[0].facet;
    this._data
      // listen to data as long as term is undefined or null
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.model = this._route.snapshot.data.path.slice(0, -1);
        this.fetchAllFilterOptions();
      });
    this.model = this._route.snapshot.data.path.slice(0, -1);
    this.selectedFacetName = this.defaultFacetName();
    this.fetchAllFilterOptions();
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
    this.fetchAllFilterOptions();
  }

  fetchAllFilterOptions() {
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
          this.selectedFacetProps = this.selectedFacet.toProps();
          this.loading = false;
          this.changeRef.detectChanges();
        },
      error: e => {
        throw(e);
      }
    });
  }

}
