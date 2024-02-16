import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Facet} from '../../../../models/facet';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SelectedFacetService} from '../selected-facet.service';
import {PathResolverService} from '../path-resolver.service';
import {FeatureTrackingService} from '../../../../pharos-services/feature-tracking.service';
import {CentralStorageService} from '../../../../pharos-services/central-storage.service';
import {BarChartComponent} from '../../../../tools/visualizations/bar-chart/bar-chart.component';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {RangeSliderComponent} from '../../../../tools/range-slider/range-slider.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  imports: [BarChartComponent, MatTooltip, MatButtonModule, MatIcon, RangeSliderComponent],
  selector: 'pharos-facet-histogram',
  templateUrl: './facet-histogram.component.html',
  styleUrls: ['./facet-histogram.component.scss']
})
export class FacetHistogramComponent implements OnInit, OnDestroy {

  @Input()
  applyFilterOverride: (histogramComponent: any) => void;

  constructor(
    private router: Router,
    private centralStorageService: CentralStorageService,
    private changeRef: ChangeDetectorRef,
    private selectedFacetService: SelectedFacetService,
    private pathResolverService: PathResolverService,
    private _route: ActivatedRoute,
    private featureTrackingService: FeatureTrackingService) {
  }

  /**
   * unsubscribe subject
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject();

  chartData: any[] = [];

  @Input() facet: Facet;

  min: number;
  minSetting: number;
  minUsedByList?: number;

  max: number;
  maxSetting: number;
  maxUsedByList?: number;

  boundsChangedSubject: Subject<void> = new Subject<void>();

  boundsChanged(event){
    this.minSetting = event.value[0];
    this.maxSetting = event.value[1];
    this.changeRef.detectChanges();
    this.boundsChangedSubject.next();
  }

  sliderRange(){
    return [this.minSetting, this.maxSetting];
  }
  currentRangeDisplay(){
    let decimals = 0;
    if (Math.floor(this.facet.binSize) !== this.facet.binSize) {
      decimals = this.facet.binSize.toString().split('.')[1].length;
    }
    return `[ ${this.minSetting?.toFixed(decimals)}, ${this.maxSetting?.toFixed(decimals)} `
      + (this.includeUpperBound() ? ']' : ')');
  }

  includeUpperBound(){
    if (this.maxSetting === this.max){
      return true;
    }
    if (this.maxSetting === this.minSetting){
      return true;
    }
    return false;
  }

  currentSettingsAreApplied(){
    return this.minSetting === this.minUsedByList && this.maxSetting === this.maxUsedByList;
  }

  currentRangeTooltip(){
    const rangeText = `to values that are >= ${this.minSetting} and ${this.includeUpperBound() ? '<=' : '<'} ${this.maxSetting}`;
    if (this.currentSettingsAreApplied()){
      return `The list has been filtered ${rangeText}`;
    }
    else{
      return `Tap 'Apply' to filter the list ${rangeText}`;
    }
  }

  applyButtonTooltip(){
    return `Filter the list to the current range`;
  }

  applyFilter(){
    if (this.applyFilterOverride) {
      this.applyFilterOverride(this);
      return;
    }
    this.selectedFacetService.removefacetFamily(this.facet);
    this.selectedFacetService.setFacets({name: this.facet.facet, change: {added: [this.currentRangeDisplay()]}});
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.featureTrackingService.trackFeature('Using a Numerical Filter', this.centralStorageService.getModel(this._route),
      this.facet.facet);

    this.pathResolverService.navigate(queryParams, this._route, this.selectedFacetService.getPseudoFacets());
  }

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalize the component
        if (e instanceof NavigationEnd) {
          // update field values
          this.initialize();
          this.changeRef.detectChanges();
          this.boundsChangedSubject.next();
        }
      });
    this.initialize();
  }

  initialize(){
    const valMap: Map<string, number> = new Map<string, number>();
    this.min = this.facet.min;
    this.max = this.facet.max;

    this.facet.values.forEach(d => {
      valMap.set(d.name, d.count);
    });
    this.chartData = Array.from(valMap.entries());

    this.mapSelected();
  }

  mapSelected() {
    const selected: Facet = this.selectedFacetService.getFacetByName(this.facet.facet);
    if (selected) {
      const pieces = selected.values[0].name.split(',').map(s => s.replace(/[^0-9|\-|\.]/g, ''));
      this.minUsedByList = pieces[0] == null || pieces[0].length === 0 ? null : +pieces[0];
      this.maxUsedByList = pieces[1] == null || pieces[1].length === 0 ? this.max : +pieces[1];
      this.minSetting = this.minUsedByList;
      this.maxSetting = this.maxUsedByList;
    } else {
      this.minUsedByList = null;
      this.maxUsedByList = null;
      this.minSetting = this.min;
      this.maxSetting = this.max;
    }
  }


  /**
   * function to unubscribe on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
