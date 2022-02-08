import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {HeatMapComponent, HeatMapData} from '../../../tools/visualizations/heat-map/heat-map.component';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {takeUntil} from 'rxjs/operators';
import {FieldSelectionDialogComponent} from '../../../tools/field-selection-dialog/field-selection-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {TourType} from '../../../pharos-services/tour.service';
import {FeatureTrackingService} from '../../../pharos-services/feature-tracking.service';

@Component({
  selector: 'pharos-cross-list-heatmap',
  templateUrl: './cross-list-heatmap.component.html',
  styleUrls: ['./cross-list-heatmap.component.scss']
})
export class CrossListHeatmapComponent extends DynamicPanelComponent implements OnInit {

  constructor(private pharosApiService: PharosApiService,
              private _route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              public dynamicServices: DynamicServicesService,
              private dialog: MatDialog,
              private featureTrackingService: FeatureTrackingService) {
    super(dynamicServices);
  }

  @Input() model: string;
  @Input() crossModel: string;
  @Input() rowParseFunction: any;
  @Input() domain: number[] = [0, 5];
  @Input() measure = 'Confidence';
  @Input() defaultSubset;
  @Input() title: string;
  tourType: TourType;
  showDetails = false;
  loadingDetails = false;
  modelLink: string;
  crossModelLink: string;

  @ViewChild('heatMap', {static: true}) heatMapContainer: HeatMapComponent;
  results: any;
  heatmapWasRun = false;

  @Output() detailsChanged = new EventEmitter<boolean>();

  activityMap: HeatMapData;

  selectedData;

  ngOnInit(): void {
    this.tourType = TourType.Heatmaps;
    this._data
      // listen to data as long as term is undefined or null
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.results = [];
        this.heatmapWasRun = false;
        this.activityMap = null;
        this.showDetails = false;
        this.modelLink = this.model.toLowerCase() + 's';
        this.crossModelLink = this.crossModel.toLowerCase() + 's';
        this.changeDetectorRef.markForCheck();
      });
    this.loadingComplete(false);
  }

  initialize() {
    this.loadingStart();
    this.pharosApiService.crossListquery(this._route.snapshot, this.model, this.crossModel).then((res: any) => {
      this.results = res.data.listCross;
      this.heatmapWasRun = true;
      this.changeDetectorRef.detectChanges();
      if (this.results && this.results.length > 0) {
        this.updateHeatmapData();
      }
      this.loadingComplete(false);
      this.changeDetectorRef.detectChanges();
      this.heatMapContainer.redraw();
      this.featureTrackingService.trackFeature('Create Heatmap',
        this.model, this.crossModel, `${this.activityMap.xValues.length} x ${this.activityMap.yValues.length}`
        + (this.results?.length === 10000 ? ' truncated' : '') );
    });
  }

  updateHeatmapData() {
    this.activityMap = new HeatMapData(this.model, this.crossModel, '', this.domain, this.measure);
    this.setMapData(this.activityMap, this.results);
  }

  setMapData(heatMapData: HeatMapData, results: any[]) {
    results.forEach(row => {
      const parsedObj = this.rowParseFunction(row);
      heatMapData.addPoint(parsedObj.xVal, parsedObj.yVal, parsedObj.stringVal, parsedObj.numVal, parsedObj.data, parsedObj.metadata);
    });
  }

  heatmapClicked(data) {
    if (this.selectedData == data && this.showDetails) {
      this.showDetails = false;
      return;
    }
    this.showDetails = true;
    this.loadingDetails = true;
    this.selectedData = data;
    this.pharosApiService.crossListDetailsQuery(this._route.snapshot, this.model, this.crossModel,
      data.metadata.x, data.metadata.y).then((res: any) => {
      this.detailsChanged.emit(res.data.listCrossDetails);
      this.loadingDetails = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  downloadData() {
    const dialogRef = this.dialog.open(FieldSelectionDialogComponent, {
      data: {count: this.data.count, model: this.model, route: this._route, defaultSubset: this.defaultSubset},
      height: '75vh', width: '66vw'
    }).afterClosed();
  }


}
