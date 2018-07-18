import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {RadarChartComponent} from '../../../../../tools/visualizations/radar-chart/radar-chart.component';
import {MatDialog} from '@angular/material';
import {PharosPoint} from '../../../../../tools/visualizations/line-chart/line-chart.component';
import {Target} from '../../../../../models/target';
import {TableData} from "../../../../../models/table-data";
import {Property} from "../../../../../models/property";


@Component({
  selector: 'pharos-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.css']
})
export class SummaryPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  loaded = false;
  @Input() target: Target;

  timelines: any[] = [];
  radarOptions: any;
  tableData:any[];
  tlMap: Map<string, any> = new Map<string, any>();

  fields: TableData[] = [
    new TableData({
      name: 'field',
      label: 'Field'
    }),
    new TableData( {
      name: 'value',
      label: 'Knowledge Value'
    })
  ];
  // todo: known bug in angular prevents this from working. Angular 6 may fix it, but flex would also need to be updated.
  // todo: https://github.com/angular/angular/issues/11716 https://github.com/angular/angular/issues/8785
/*  @HostBinding('attr.fxFlex')
  flex = this.width;*/

// todo: remove these http calls after api is fixed
  constructor(
    private _http: HttpClient,
    public dialog: MatDialog
  ) {
    super();
  }

ngOnInit() {
  this._data
  // listen to data as long as term is undefined or null
  // Unsubscribe once term has value
    .pipe(
      // todo: this unsubscribe doesn't seem to work
      //    takeWhile(() => !this.data['references'])
    )
    .subscribe(x => {
      console.log(this);
      if(this.data.knowledge && this.data.knowledge[0].axes.length > 0){
        this.tableData = [];
        this.data.knowledge[0].axes.slice(0).sort((a,b) => b.value - a.value).slice(0,5).forEach(
          field => this.tableData.push(
            {
        field: new Property({label: field.axis, term: field.axis}),
        value: new Property({label: field.axis, numval: field.value})
        })
        );
        console.log(this.tableData);
      }
      if (this.data.timelines) {
        this.fetchTimelineData();
      }
    });
}


getTimeline(field: string): any {
    return this.tlMap.get(field);
}

fetchTimelineData(): void {
  this.data.timelines.forEach(timeline => {
    if (timeline.href && !this.tlMap.get(timeline.id)) {
      this._http.get<any>(timeline.href).subscribe(res => {
        const data: PharosPoint[] = [];
      res.events.forEach(point => {
          if (point.properties) {
            const val = point.properties.filter(prop => prop.label === 'Score');
            if (val.length > 0) {
              const pt: PharosPoint = {key: point.start, value: val[0].numval};
              data.push(pt);
            } else {
              const pt: PharosPoint = {key: point.start, value: point.end};
              data.push(pt);
            }
          }
        });
        this.tlMap.set(timeline.id, data);
        this.tlMap.set(res.name, data);
      });
    }
  });
  ['PubMed Score', 'PubTator', 'Patent Count'].forEach(name => {
    const tl = this.tlMap.get(name);
    if (tl) {
      this.timelines.push(tl);
    }
  });
   this.timelines = this.timelines.filter((tl, index, arr) =>
          index === arr.findIndex(t => t.id === tl.id)
        );
}

raisePubtator() {
  if (this.target) {
      return Math.pow(10, this.target.pubTatorScore).toFixed(2);
    }
}

openModal(): void {
  const dialogRef = this.dialog.open(RadarChartComponent, {
    height: '95vh',
    width: '85vw',
    data: { data: this.data.knowledge,
            id: this.data.knowledge[0].className,
      size: 'large'}
  });
}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
