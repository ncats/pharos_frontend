import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {HeatMapData} from '../../../tools/visualizations/heat-map/heat-map.component';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';

@Component({
  selector: 'pharos-cross-list-heatmap',
  templateUrl: './cross-list-heatmap.component.html',
  styleUrls: ['./cross-list-heatmap.component.scss']
})
export class CrossListHeatmapComponent extends DynamicPanelComponent implements OnInit {

  @Input() model: string;
  @Input() crossModel: string;
  @Input() rowParseFunction: any;
  @Input() domain: number[] = [0, 5];
  @Input() measure = 'Confidence';
  @Input() title: string;

  @ViewChild('heatMap', {static: true}) heatMapContainer: ElementRef;

  constructor(private pharosApiService: PharosApiService,
              private _route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }
  results: any;

  activityMap: HeatMapData;

  ngOnInit(): void {
    this.pharosApiService.crossListquery(this._route.snapshot, this.model, this.crossModel).then((res: any) => {
      this.results = res.data.listCross;
      this.updateHeatmapData();
      this.changeDetectorRef.detectChanges();
    });
  }

  updateHeatmapData() {
    this.activityMap = new HeatMapData(this.model + 's', this.crossModel + 's', '', this.domain, this.measure);
    this.setMapData(this.activityMap, this.results);
  }

  setMapData(heatMapData: HeatMapData, results: any[]) {
    results.forEach(row => {
      const parsedObj = this.rowParseFunction(row);
      heatMapData.addPoint(parsedObj.xVal, parsedObj.yVal, parsedObj.stringVal, parsedObj.numVal, parsedObj.data);
    });
  }


}
