import {AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {UpsetIntersection} from '../upset/intersection.model';
import {Facet} from '../../../models/facet';
import {UpsetComponent} from '../upset/upset.component';
import {DynamicPanelComponent} from '../../dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';

@Component({
  selector: 'pharos-upset-plot',
  templateUrl: './upset-plot.component.html',
  styleUrls: ['./upset-plot.component.scss']
})
export class UpsetPlotComponent extends DynamicPanelComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('upsetComponent', {static: true}) upsetComponent: UpsetComponent;
  @Input() events: Observable<string>;
  @Input() selectedFacet: Facet;
  private eventsSubscription: Subscription;
  cachedResults: any;
  soloSets: any[];
  interactions: any[];
  allData: any[];
  defaultValueCount = 5;


  constructor(private pharosApiService: PharosApiService,
              private _route: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformID: any,
              private changeRef: ChangeDetectorRef,
              public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((chart) => {
      if (chart === 'upset-plot') {
        this.redraw();
      }
    });
  }

  ngOnChanges(changes) {
    if ((changes.selectedFacet && !changes.selectedFacet.firstChange) && isPlatformBrowser(this.platformID)) {
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
      facetName: this.selectedFacet.facet,
      values: this.selectedFacet.values.slice(0, this.defaultValueCount).map(f => f.name)
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
  }

  upSetBarClicked(barEvent: any): void {
    console.log(barEvent);
  }

  parseResults() {
    this.allData = [];
    this.interactions = [];
    this.soloSets = [];

    const upsetMap: Map<string, string[]> = new Map<string, string[]>();
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
          name: row.values.slice().sort().join(' + '),
          num: row.count,
          values: row.values,
          setName: this.mapToSetName(row.values)
        };
        this.interactions.push(compoundIntersection);
      }
      this.allData.push(compoundIntersection);
    });
    const missingOnes = this.selectedFacet.values.slice(0, this.defaultValueCount).filter(f => {
      return !this.soloSets.map(f => f.name).includes(f.name);
    });
    missingOnes.forEach(missing => {
      const compoundIntersection = {
        name: missing.name,
        num: 0,
        setName: this.mapToSetName([missing.name])
      };
      this.soloSets.push(compoundIntersection);
      this.allData.push(compoundIntersection);
    });
    this.soloSets.sort((a, b) => a.setName.localeCompare(b.setName));
    this.redraw();
  }

  addRemoveValues() {

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
    const index = this.selectedFacet.values.slice(0, this.defaultValueCount).findIndex(f => f.name === value);
    return nameStr[index];
  }

  redraw() {
    this.changeRef.detectChanges();
    this.upsetComponent.redrawChart();
  }

}
