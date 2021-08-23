import {AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {UpsetIntersection} from '../upset/intersection.model';
import {Facet, UpsetOptions} from '../../../models/facet';
import {UpsetComponent} from '../upset/upset.component';
import {DynamicPanelComponent} from '../../dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {SelectedFacetService} from '../../../pharos-main/data-list/filter-panel/selected-facet.service';
import {PathResolverService} from '../../../pharos-main/data-list/filter-panel/path-resolver.service';
import {UpsetFieldEditComponent} from '../../upset-field-edit/upset-field-edit.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'pharos-upset-plot',
  templateUrl: './upset-plot.component.html',
  styleUrls: ['./upset-plot.component.scss']
})
export class UpsetPlotComponent extends DynamicPanelComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('upsetComponent', {static: true}) upsetComponent: UpsetComponent;
  @Input() events: Observable<string>;
  @Input() displayFacet: Facet;
  private eventsSubscription: Subscription;
  cachedResults: any;
  soloSets: any[];
  interactions: any[];
  allData: UpsetIntersection[];
  defaultValueCount = 5;
  upsetValues: string[];
  filteringSets: string[] = [];
  customValues: Map<string, string[]> = new Map<string, string[]>();


  constructor(private pharosApiService: PharosApiService,
              public dialog: MatDialog,
              private _route: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformID: any,
              private changeRef: ChangeDetectorRef,
              public dynamicServices: DynamicServicesService,
              private selectedFacetService: SelectedFacetService,
              private pathResolverService: PathResolverService) {
    super(dynamicServices);
  }

  ngOnInit(): void {
    this.selectedFacetService._facetMap.forEach((facet: Facet, name: string) => {
      facet.upSets.forEach(upSetVals => {
        this.customValues.set(name, [...upSetVals.inGroup, ...upSetVals.outGroup]);
      });
    });
    this.initValues();
    this.eventsSubscription = this.events?.subscribe((chart) => {
      if (chart === 'upset-plot') {
        this.redraw();
      }
    });
    this.selectedFacetService.facets$.subscribe(facetMap => {
      this.updateFilteringSets(facetMap);
      this.redraw();
    });
  }

  updateFilteringSets(facetMap) {
    this.filteringSets = [];
    facetMap.forEach((facet, name) => {
      facet.upSets.forEach(set => {
        this.filteringSets.push(`${facet.facet} - ` + set.inGroup.join(' + '));
      });
      facet.values?.forEach(val => {
        this.allData?.forEach((intersection: UpsetIntersection) => {
          if (intersection.values?.includes(val.name)) {
            this.filteringSets.push(`${facet.facet} - ` + intersection.values.join(' + '));
          }
        });
      });
    });
  }

  initValues() {
    this.upsetValues = this.customValues.get(this.displayFacet?.facet) ||
      this.displayFacet?.values.slice(0, this.defaultValueCount).map(f => f.name);
  }

  ngOnChanges(changes) {
    if ((changes.displayFacet && !changes.displayFacet.firstChange) && isPlatformBrowser(this.platformID)) {
      this.initValues();
      this.fetchValues();
    }
  }

  ngAfterViewInit(): void {
    this.fetchValues();
  }

  facetChanged(event) {
    this.fetchValues();
  }

  fetchValues() {
    this.loadingStart();
    const variables = {
      facetName: this.displayFacet?.facet,
      values: this.upsetValues
    };
    if (isPlatformBrowser(this.platformID)) {
      this.pharosApiService.getUpsetQuery(this._route.snapshot, variables).then(
        res => {
          if (res) {
            this.cachedResults = res;
            this.parseResults();
          }
          this.loadingComplete();
          this.changeRef.markForCheck();
        }).catch(
        err => {
          alert(err);
        });
    }
    this.changeRef.markForCheck();
  }

  upSetBarClicked(barEvent: any): void {
    if (!this.customValues.has(this.displayFacet.facet)) {
      this.customValues.set(this.displayFacet.facet, this.upsetValues);
    }
    const newUpSetFilter = new UpsetOptions(barEvent.values, this.upsetValues);
    const existingFacet = this.selectedFacetService._facetMap.get(this.displayFacet.facet);
    if (this.valueAlreadySelected(existingFacet, newUpSetFilter)) {
      return;
    }
    const completeFilters = this.getCompleteMarginalFilters(existingFacet, newUpSetFilter);
    let changes = {};

    if (completeFilters.length > 0) {
      changes = {
        added: completeFilters,
        removed: existingFacet?.upSets?.filter(f => f.inGroup.some(v => completeFilters.includes(v)))
      };
    } else {
      changes = {
        added: newUpSetFilter
      };
    }
    this.selectedFacetService.setFacets(
      {
        name: this.displayFacet.facet,
        change: changes
      });
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams, this._route, this.selectedFacetService.getPseudoFacets());
  }

  getCompleteMarginalFilters(currentFacet: Facet, newSet: UpsetOptions) {
    const existingUpSets = currentFacet?.upSets || [];
    const completedFilters = [];
    newSet.inGroup.forEach(val => {
      let complete = true;
      // is this set the last set that has this value ?
      const participatingSets = this.allData.filter(s => {
        return JSON.stringify(s.values).includes(val) && (s.num > 0) &&
          !currentFacet?.values.map(f => f.name).some(c => s?.values.includes(c));
      });

      participatingSets.forEach(set => {
        // is this the set that is being added ?
        if (JSON.stringify(set.values) === JSON.stringify(newSet.inGroup)) {
          return;
        }
        if (existingUpSets.map(f => JSON.stringify(f.inGroup)).includes(JSON.stringify(set.values))) {
          return;
        }
        complete = false;
      });
      if (complete) {
        completedFilters.push(val);
      }
    });
    return completedFilters;
  }

  valueAlreadySelected(currentFacet: Facet, newFilter: UpsetOptions) {
    if (!currentFacet) { // no facet selections
      return false;
    }
    let found = false;
    newFilter.inGroup.forEach((inVal: string) => { // values already included via marginal filter selection
      if (currentFacet.values.map(v => v.name).includes(inVal)) {
        found = true;
      }
    });
    return found || currentFacet.upSets.some(v => JSON.stringify(v) === JSON.stringify(newFilter)); // intersection already selected
  }

  parseResults() {
    this.allData = [];
    this.interactions = [];
    this.soloSets = [];

    this.cachedResults.data.upset.forEach(row => {
      let compoundIntersection: UpsetIntersection;
      if (row.values.length === 1) {
        compoundIntersection = {
          name: row.values[0],
          num: row.count,
          values: [row.values[0]],
          setName: this.mapToSetName(row.values)
        };
        this.soloSets.push(compoundIntersection);
      } else if (row.values.length > 1) {
        compoundIntersection = {
          name: row.values.slice().sort((a, b) => {
            return a.toLowerCase().localeCompare(b.toLowerCase());
          }).join(' + '),
          num: row.count,
          values: row.values,
          setName: this.mapToSetName(row.values)
        };
        this.interactions.push(compoundIntersection);
      }
      this.allData.push(compoundIntersection);
    });
    const soloNames = this.soloSets.map(f => f.name);
    const missingOnes = this.upsetValues.filter(val => {
      return !soloNames.includes(val);
    });
    missingOnes.forEach(missing => {
      const compoundIntersection = {
        name: missing,
        num: 0,
        values: [missing],
        setName: this.mapToSetName([missing])
      };
      this.soloSets.push(compoundIntersection);
      this.allData.push(compoundIntersection);
    });
    this.soloSets.sort((a, b) => a.setName.localeCompare(b.setName));
    this.updateFilteringSets(this.selectedFacetService._facetMap);
    this.redraw();
  }

  mapToSetName(values: string[]) {
    let ret = '';
    values.forEach(val => {
      ret = ret + this.mapOneVal(val);
    });
    return ret.split('').sort().join('');
  }

  mapOneVal(value: string) {
    const nameStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const index = this.upsetValues.findIndex(f => f === value);
    return nameStr[index];
  }

  redraw() {
    this.changeRef.detectChanges();
    this.upsetComponent.redrawChart();
  }


  editUpSetFields() {
    const dialogRef = this.dialog.open(UpsetFieldEditComponent, {
        height: '75vh', width: '66vw',
        data: {
          facet: this.displayFacet,
          selectedValues: this.upsetValues,
          path: this._route.snapshot.data.path
        },
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.upsetValues = result;
        this.customValues.set(this.displayFacet.facet, result);
        this.fetchValues();
      }
    });
  }
}
